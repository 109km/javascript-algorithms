
# Deep into Array

Let's take a look the beginning part of `Array`'s defination in V8 engine.

```c++
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray: public JSObject {
 public:
  // [length]: The length property.
  DECL_ACCESSORS(length, Object)
    
  // ...
   
  // Number of element slots to pre-allocate for an empty array.
  static const int kPreallocatedArrayElements = 4;
};
```


## `Array` is a special `Object`.

And also from the code above we can see that `Array` is inherited from `Object`. It means the array in JavaScript is just a special formed object.

So it explains why `typeof [] === "object"`.

## `Array` has two modes of storage.

### Fast

The data structure of this mode is `FixedArray`. It's like an array in `C` : it occupies some continuous space in memory.

When a new empty array is created, the default mode is `fast`.

### Slow

The data structure of this mode is `HashTable`. So this mode needs more memory and the efficiency is slow.

```c++

// src/objects/dictionary.h
class EXPORT_TEMPLATE_DECLARE(V8_EXPORT_PRIVATE) Dictionary
    : public HashTable<Derived, Shape> {
  using DerivedHashTable = HashTable<Derived, Shape>;

 public:
  using Key = typename Shape::Key;
  // Returns the value at entry.
  inline Object ValueAt(InternalIndex entry);
  inline Object ValueAt(const Isolate* isolate, InternalIndex entry);
  
  // ...
};

```


### Dynamic capacity in array

From the code we can see an empty array has 4 slots, and takes 32 bytes memory.


#### Increase the capacity

```c++
// Number of element slots to pre-allocate for an empty array.
static const int kPreallocatedArrayElements = 4;
```
When we `push` elements to the array, if the capacity is not enough, it will scale its capacity.

```c++
// js-objects.h
static const uint32_t kMinAddedElementsCapacity = 16;

// code-stub-assembler.cc
Node* CodeStubAssembler::CalculateNewElementsCapacity(Node* old_capacity,
                                                      ParameterMode mode) {
  CSA_SLOW_ASSERT(this, MatchesParameterMode(old_capacity, mode));
  Node* half_old_capacity = WordOrSmiShr(old_capacity, 1, mode);
  Node* new_capacity = IntPtrOrSmiAdd(half_old_capacity, old_capacity, mode);
  Node* padding =
      IntPtrOrSmiConstant(JSObject::kMinAddedElementsCapacity, mode);
  return IntPtrOrSmiAdd(new_capacity, padding, mode);
}
```

The calculation formula:

```new capcacity = old capacity * 1.5 + 16```

For example:

```js
var arr = []; // capacity = 4

for (let i = 0; i < 5 ; i++){
  arr[i] = i;
}
// when the size reaches 5
// new capacity = 4 * 1.5 + 16 = 22
```

#### Decrease the capacity

The calculation formula:

```current capacity >= length * 2 + 16```

It means if the capacity is twice as the length of the array, it will decrease the capacity, and the new capacity will be the length of array.



### Convert between fast and slow

#### From fast to slow

**Situation 1 : New index - array's length >= 1024**

Let's see the source code:

```c++
// src/objects/js-objects.h
static const uint32_t kMaxGap = 1024;

static inline bool ShouldConvertToSlowElements(JSObject object,
                                               uint32_t capacity,
                                               uint32_t index,
                                               uint32_t* new_capacity) {
  STATIC_ASSERT(JSObject::kMaxUncheckedOldFastElementsLength <=
                JSObject::kMaxUncheckedFastElementsLength);
  if (index < capacity) {
    *new_capacity = capacity;
    return false;
  }
  // 当加入的索引值（例如例3中的2000）比当前容量capacity 大于等于 1024时，
  // 返回true，转为慢数组
  if (index - capacity >= JSObject::kMaxGap) return true;
  *new_capacity = JSObject::NewElementsCapacity(index + 1);
  DCHECK_LT(index, *new_capacity);
  // TODO(ulan): Check if it works with young large objects.
  if (*new_capacity <= JSObject::kMaxUncheckedOldFastElementsLength ||
      (*new_capacity <= JSObject::kMaxUncheckedFastElementsLength &&
       ObjectInYoungGeneration(object))) {
    return false;
  }
  return ShouldConvertToSlowElements(object.GetFastElementsUsage(),
                                     *new_capacity);
}

```

For example:

```js

var arr = [1,2,3];

// If new index is 100, 100 - 3 < 1024,
// now the empty elements will be filled with holes.
// `hole` is a special element used as placeholder.
arr[100] = 10;

// But if new index is 2000, and array's length is 4.
// 2000 - 4 > 1024.
// Now this array will be converted to slow mode.
arr[2000] = 100;
```

**Situation 2 :  new storage > 3 * 3 * old storage**

Let's see source code:

```c++
// src/objects/dictionary.h
// JSObjects prefer dictionary elements if the dictionary saves this much
// memory compared to a fast elements backing store.
static const uint32_t kPreferFastElementsSizeFactor = 3;

static const int kEntrySize = 3;

// src/objects/js-objects-inl.h
// If the fast-case backing storage takes up much more memory than a dictionary
// backing storage would, the object should have slow elements.
// static
static inline bool ShouldConvertToSlowElements(uint32_t used_elements,
                                               uint32_t new_capacity) {
  uint32_t size_threshold = NumberDictionary::kPreferFastElementsSizeFactor *
                            NumberDictionary::ComputeCapacity(used_elements) *
                            NumberDictionary::kEntrySize;
  return size_threshold <= new_capacity;
}
```

For example:

```js
// An empty array takes 4 slots, 32 bytes.
var arr = [];
// Add 20 objects to the array.
// It will convert to slow mode.
// Because each object takes a lot memory.
for (let i = 0; i < 20; i++){
  arr[i] = {};
}
```

**Situation 3 :  `push` elements to a pre-allocated array**

```js
var arr = new Array(100);
arr.push(1); // The array is converted to slow mode.
```

### From slow to fast

The source code:

```c++
static bool ShouldConvertToFastElements(JSObject object,
                                        NumberDictionary dictionary,
                                        uint32_t index,
                                        uint32_t* new_capacity) {
  // If properties with non-standard attributes or accessors were added, we
  // cannot go back to fast elements.
  if (dictionary.requires_slow_elements()) return false;
  // Adding a property with this index will require slow elements.
  if (index >= static_cast<uint32_t>(Smi::kMaxValue)) return false;
  if (object.IsJSArray()) {
    Object length = JSArray::cast(object).length();
    if (!length.IsSmi()) return false;
    *new_capacity = static_cast<uint32_t>(Smi::ToInt(length));
  } else if (object.IsJSArgumentsObject()) {
    return false;
  } else {
    *new_capacity = dictionary.max_number_key() + 1;
  }
  *new_capacity = Max(index + 1, *new_capacity);
  uint32_t dictionary_size = static_cast<uint32_t>(dictionary.Capacity()) *
                             NumberDictionary::kEntrySize;
  // Turn fast if the dictionary only saves 50% space.
  return 2 * dictionary_size >= *new_capacity;
}
```

This rules are clear: 

* The slow elements can be stored in fast array.
* The slow mode saves less than 50% space.