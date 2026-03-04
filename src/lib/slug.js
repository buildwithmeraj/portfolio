export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateUniqueSlug({
  db,
  collectionName,
  title,
  excludeId = null,
}) {
  const collection = db.collection(collectionName);
  const base = slugify(title) || "item";
  let slug = base;
  let counter = 0;

  while (true) {
    const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
    const existing = await collection.findOne(query, { projection: { _id: 1 } });
    if (!existing) {
      return slug;
    }
    counter += 1;
    slug = `${base}-${counter}`;
  }
}
