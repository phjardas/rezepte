export function materialize(doc) {
  return (
    doc &&
    doc.exists && {
      ...doc.data(),
      id: doc.id,
      _cached: doc.metadata && doc.metadata.fromCache,
    }
  );
}
