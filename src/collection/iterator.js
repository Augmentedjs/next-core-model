// CollectionIterator
// ------------------

// This "enum" defines the three possible kinds of values which can be emitted
// by a CollectionIterator that correspond to the values(), keys() and entries()
// methods on Collection, respectively.
const ITERATOR_VALUES = 1;
const ITERATOR_KEYS = 2;
// const ITERATOR_KEYSVALUES = 3;

/** A CollectionIterator implements JavaScript's Iterator protocol, allowing the
 * use of `for of` loops in modern browsers and interoperation between
 * Collection and other JavaScript functions and third-party libraries
 * which can operate on Iterables.
 */
class CollectionIterator {
  constructor(collection, kind) {
    this._collection = collection;
    this._kind = kind;
    this._index = 0;
  };

  // All Iterators should themselves be Iterable.
  /* ???
  if ($$iterator) {
    CollectionIterator.prototype[$$iterator] = function() {
      return this;
    };
  }*/

  /**
   * Next model in collection<br/>
   * Once exhausted, remove the reference to the collection so future
   * calls to the next method always return done.
   */
  next() {
    if (this._collection) {
      // Only continue iterating if the iterated collection is long enough.
      if (this._index < this._collection.length) {
        const model = this._collection.at(this._index);
        this._index++;

        // Construct a value depending on what kind of values should be iterated.
        let value;
        if (this._kind === ITERATOR_VALUES) {
          value = model;
        } else {
          const id = this._collection.modelId(model.attributes);
          if (this._kind === ITERATOR_KEYS) {
            value = id;
          } else { // ITERATOR_KEYSVALUES
            value = [id, model];
          }
        }
        return {value: value, done: false};
      }

      // Once exhausted, remove the reference to the collection so future
      // calls to the next method always return done.
      this._collection = void 0;
    }
    return {value: void 0, done: true};
  };
};

export default CollectionIterator;
