# HashTable introductions

## HashTable

It's easy to find this structure around us, like the ID card's number is a kind of hash table:

![](./id-structure.drawio.svg)

Different digit indicates different message. We have to convert the whole string of numbers to its real meanings.

Like if `61` shows in position of province, it means `ShaanXi Province`, and in this case the city's number `01` means `Xi'an`.

But when province's number is `11`, city's number `01` means `Beijing`. The 8-digit birth's number has no relations with other numbers.

This example tells us sometimes there is a relationship between them, yet sometimes there isn't.

The way of conversion is called `hash function` in computer science.

![](./hash-table.drawio.svg)

This picture shows the process of the hash table.

