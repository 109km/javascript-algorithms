# LRU algorithm in front end

## LRU evict policy

When we are using browsers, they can cache many web resources for us. But the storage is always limited. When the cache capacity reaches maximum, what the browsers will do?

In short, the browsers will clean the `least recently used` items. The policy is quite easy to understand from its name.

For example: 

```js

// Let's assume the cache can only store 3 resouces.
var cache = [];

// If the cache isn't full, just put items into it.
cache.push('A');
cache.push('B');
cache.push('C');

// Now we continue to visit website "D".
// But the cache is full, we must remove the
// "Least Recently Used" one, so it's "A".
cache.splie(1);

// Then put "D" into cache.
cache.push('D');
```

The code is simple, and it shows the core concept of this policy: **Least Recently Used**.

This policy is widely used in many places, like `Linux memory management` , `Redis` and so on.

## LRU in Vue

In `Vue`, there is a tag used to cache components: `keep-alive`.

```html
<keep-alive>
  <some-component></some-component>
</keep-alive>
```

The `kee-alive` uses property `max` to define how many components can be cached. When the cache reaches the `max`, `LRU` starts to work.

Let's take a look at the source code of this part:

```js
export default {
  name: "keep-alive",
  // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  abstract: true, 
  props: {
    // 被缓存组件
    include: patternTypes, 
    // 不被缓存组件
    exclude: patternTypes,
    // 指定缓存大小
    max: [String, Number] 
  },
  created() {
    // 初始化用于存储缓存的 cache 对象
    this.cache = Object.create(null);
    // 初始化用于存储VNode key值的 keys 数组
    this.keys = []; 
  },
  destroyed() {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted() {
    // 监听缓存（include）/不缓存（exclude）组件的变化
    // 在变化时，重新调整 cache
    // pruneCache：遍历 cache，如果缓存的节点名称与传入的规则没有匹配上的话，就把这个节点从缓存中移除
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },
  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // name 不在 inlcude 中或者在 exlude 中则直接返回 vnode，否则继续进行下一步
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }
      
      const { cache, keys } = this;
      // 获取键，优先获取组件的 name 字段，否则是组件的 tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
        
      // --------------------------------------------------
      // 下面就是 LRU 算法了，
      // 如果在缓存里有则调整，
      // 没有则放入（长度超过 max，则淘汰最近没有访问的）
      // --------------------------------------------------
      // 如果命中缓存，则从缓存中获取 vnode 的组件实例，并且调整 key 的顺序放入 keys 数组的末尾
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 如果没有命中缓存,就把 vnode 放进缓存
      else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
};

// 移除 key 缓存
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

// remove 方法（shared/util.js）
/**
 * Remove an item from an array.
 */
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

## Realize a LRU

Realize a LRU policy which supports two actions `get` and `put`.

Can the two actions' time complexity is O(1)?

The final code should be like this:

```js
var cache = new LRUCache(2);

cache.put(1,1);
cache.put(2,2);
cache.get(1);   // Return 1
cache.put(3,3); // Makes 2 unavailble
cache.get(2);   // Return -1
cache.get(3);   // Return 3
cache.put(4,4); // Makes 1 unavailble
```

Here is the solution, by using `Map`.

`Map`'s bottom implementation is `LinkedHashMap` which is an ordered HashMap.

Each time we `set` a value to the `Map`, the new value will be added to the end of the chain.

And as we know, a HashMap's time complexity is O(1).(Best situation).

```js
export default class LRUCache {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }
  get(key) {
    const value = this.cache.get(key);
    if (!value) return -1;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (cache.size > this.max) {
      const oldestKey = this.cache.keys().next().value;
      cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
```