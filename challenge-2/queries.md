# Challenge 2 - Queries

## SQL (PostgreSQL)

Get products between $50 and $200, sorted by price asc, 10 per page:

```sql
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET 0;
```

for page 2 use OFFSET 10, page 3 use 20...
basically OFFSET = (page - 1) * 10

index:
```sql
CREATE INDEX idx_products_price ON products(price);
```

## MongoDB

Electronics only, price high to low, 5 per page:

```js
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .skip(0)
  .limit(5)
```

page 2 = skip(5), page 3 = skip(10)

index so it doesn't scan the whole collection:
```js
db.products.createIndex({ category: 1, price: -1 })
```

## How to optimize for high traffic

- add indexes on the fields we filter
- cache the popular pages (redis) for like 30-60 sec
- when someone updates/deletes a product, clear that cache
- don't return fields we don't need
- For large datasets, use cursor-based pagination instead of SKIP to improve performance on deep pages.