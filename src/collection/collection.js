import { AugmentedObject } from "next-core-object";
import { extend, isString, isFunction, some, splice, sortObjects } from "next-core-utilities";
import AbstractModel from "../model/abstractModel.js";
import { ValidationFramework } from "next-core-validation";
import CollectionIterator from "./iterator.js";
import { clone } from "lodash";

const findModelByMatchingProperties = (set, properties) => {
  return set.filter( (entry) => {
    return Object.keys(properties).every( (key) => {
      return entry._attributes[key] === properties[key];
    });
  });
};

const whereIndex = (set, properties) => {
  return set.findIndex((collectionItem) =>
    Object.keys(properties).every(key =>
      collectionItem.hasOwnProperty(key) && properties[key] === collectionItem[key]));
};

// Default options for `Collection#set`.
const setOptions = {
  add: true,
  remove: true,
  merge: true
};

const addOptions = {
  add: true,
  remove: false
};

/**
 * Abstract Augmented Collection <br/>
 * Supports: <ul>
 * <li>Validation and Schemas</li>
 * <li>Security</li>
 * </ul>
 * @extends AugmentedObject
 */
class AbstractCollection extends AugmentedObject {
  constructor(models, options = {}) {
    super(options);

    this.length = 0;
    this.models = [];
    this._byId = {};
    this.schema = null;
    this.validationMessages = {
      valid: true
    };

    this.preinitialize(models, options);
    if (options.model) {
      this.model = options.model;
    }
    if (options.comparator !== void 0) {
      this.comparator = options.comparator;
    }
    this._reset();
    this.initialize(models, options);
    if (models) {
      // used to use reset but this collection never existed
      this.add(models, extend({silent: true}, options));
    }
    if (!this.model) {
      this.model = new AbstractModel();
    }
  };

  /**
   * Schema property
   * @property {object} schema The JSON schema from this collection
   */

  /**
   * Validation Message property
   * @property {object} validationMessages The property holding validation message data
   */

  preinitialize(models, options) {
  };

  initialize(models, options) {
  };

  /** The JSON representation of a Collection is an array of the
   * models" attributes.
   */
  toJSON() {
    //return this.map( (model) => { return model.toJSON(options); });
    let i = 0;
    const out = [], l = this.models.length;
    for (i = 0; i < l; i++) {
      out[i] = this.models[i].toJSON();
    }
    return out;
  };

  /*map(collection, interatee) {
    return _map(collection, interatee);
  };*/

  /**
   * Add a model, or list of models to the set. `models` may be
   * Models or raw JavaScript objects to be converted to Models, or any
   * combination of the two.
   * @deprecated call addModels
   */
  add(models, options = {}) {
    return this.addModels(models, options);
  };

  /**
   * Add a model, or list of models to the set. `models` may be
   * Models or raw JavaScript objects to be converted to Models, or any
   * combination of the two.
   * @param {Model|array} models Models to add or single model
   * @param {object} options Option s to add
   * @returns {Model} Return the added (or merged) model (or models).
   */
  addModels(models, options) {
    return this.set(models, extend({ merge: false }, options, addOptions));
  };

  /** Remove a model, or a list of models from the set.
  */
  removeModels(models = [], options = {}) {
    options = extend({}, options);
    const singular = !Array.isArray(models);
    models = singular ? [models] : models.slice();
    const removed = this._removeModels(models, options);

    console.debug("removed ret", removed);

    if (!options.silent && removed.length) {
      options.changes = { added: [], merged: [], removed: removed };
      this.trigger("update", this, options);
    }
    return singular ? removed[0] : removed;
  };

  /** Update a collection by `set`-ing a new list of models, adding new ones,
   * removing models that are no longer present, and merging models that
   * already exist in the collection, as necessary. Similar to **Model#set**,
   * the core operation for updating the data contained by the collection.
   */
  set(models, options = {}) {
    if (models === null) {
      return;
    }

    options = extend({}, setOptions, options);
    if (options.parse && !this._isModel(models)) {
      models = this.parse(models, options) || [];
    }

    //console.debug("collection.add: models", models);

    let singular = !Array.isArray(models);
    models = singular ? [models] : models.slice();

    //console.debug("collection.add: singular", singular);

    let at = options.at;
    if (at != null) at = +at;
    if (at > this.length) at = this.length;
    if (at < 0) at += this.length + 1;

    let set = [];
    let toAdd = [];
    let toMerge = [];
    let toRemove = [];
    let modelMap = {};

    let add = options.add;
    let merge = options.merge;
    let remove = options.remove;

    //console.debug("collection.add: options add", add);
    //console.debug("collection.add: options merge", merge);
    //console.debug("collection.add: options remove", remove);

    let sort = false;
    let sortable = this.comparator && at == null && options.sort !== false;
    let sortAttr = isString(this.comparator) ? this.comparator : null;

    // Turn bare objects into model references, and prevent invalid models
    // from being added.
    let model, i;
    const l = models.length;

    //console.debug("collection.add: num models", l);

    for (i = 0; i < l; i++) {
      model = models[i];

      //console.debug("collection.add: model", i, model);

      // If a duplicate is found, prevent it from being added and
      // optionally merge it into the existing model.
      let existing = this.get(model);

      //console.debug("collection.add: existing", i, existing);
      if (existing) {
        if (merge && model !== existing) {
          let attrs = this._isModel(model) ? model._attributes : model;
          if (options.parse) attrs = existing.parse(attrs, options);
          existing.set(attrs, options);
          toMerge.push(existing);
          if (sortable && !sort) sort = existing.hasChanged(sortAttr);
        }
        if (!modelMap[existing.cid]) {
          modelMap[existing.cid] = true;
          set.push(existing);
        }
        models[i] = existing;

      // If this is a new, valid model, push it to the `toAdd` list.
      } else if (add) {
        model = models[i] = this._prepareModel(model, options);

        //console.debug("collection.add: add model", i, model);

        if (model) {
          toAdd.push(model);
          this._addReference(model, options);
          modelMap[model.cid] = true;
          set.push(model);
        }
      }
    }

    //console.debug("collection.add: set models", set);
    //console.debug("collection.add: toAdd models", toAdd);
    //console.debug("collection.add: toMerge models", toMerge);

    // Remove stale models.
    if (remove) {
      for (i = 0; i < this.length; i++) {
        model = this.models[i];
        if (!modelMap[model.cid]) toRemove.push(model);
      }
      if (toRemove.length) this._removeModels(toRemove, options);
    }

    // See if sorting is needed, update `length` and splice in new models.
    let orderChanged = false;
    let replace = !sortable && add && remove;
    if (set.length && replace) {
      orderChanged = this.length !== set.length || some(this.models, (m, index) => {
        return m !== set[index];
      });
      this.models.length = 0;
      splice(this.models, set, 0);
      this.length = this.models.length;
    } else if (toAdd.length) {
      if (sortable) {
        sort = true;
      }
      splice(this.models, toAdd, at == null ? this.length : at);
      this.length = this.models.length;
    }

    // Silently sort the collection if appropriate.
    if (sort) this.sort({silent: true});

    // Unless silenced, it"s time to fire all appropriate add/sort/update events.
    if (!options.silent) {
      for (i = 0; i < toAdd.length; i++) {
        if (at != null) options.index = at + i;
        model = toAdd[i];
        model.trigger("add", model, this, options);
      }
      if (sort || orderChanged) this.trigger("sort", this, options);
      if (toAdd.length || toRemove.length || toMerge.length) {
        options.changes = {
          added: toAdd,
          removed: toRemove,
          merged: toMerge
        };
        this.trigger("update", this, options);
      }
    }

    //console.debug("collection.add: finished models", this.toJSON());

    // Return the added (or merged) model (or models).
    return singular ? models[0] : models;
  };

  /** When you have more items than you want to add or remove individually,
   * you can reset the entire set with a new list of models, without firing
   * any granular `add` or `remove` events. Fires `reset` when finished.
   * Useful for bulk operations and optimizations.
   */
  reset(models, options) {
    options = options ? clone(options) : {};
    for (let i = 0; i < this.models.length; i++) {
      this._removeReference(this.models[i], options);
    }
    options.previousModels = this.models;
    this._reset();
    models = this.add(models, extend({silent: true}, options));
    if (!options.silent) this.trigger("reset", this, options);
    return models;
  };

  /** Add a model to the end of the collection.
  */
  push(model, options) {
    return this.add(model, extend({at: this.length}, options));
  };

  /** Remove a model from the end of the collection.
   */
  pop(options) {
    const model = this.at(this.length - 1);
    return this.removeModels(model, options);
  };

  /** Add a model to the beginning of the collection.
   */
  unshift(model, options) {
    return this.add(model, extend({at: 0}, options));
  };

  /** Remove a model from the beginning of the collection.
   */
  shift(options) {
    const model = this.at(0);
    return this.removeModels(model, options);
  };

  /** Slice out a sub-array of models from the collection.
   */
  slice(...args) {
    return this.models.slice(args);
  };

  /** Get a model from the set by id, cid, model object with id or cid
   * properties, or an attributes object that is transformed through modelId.
   */
  get(obj) {
    //console.debug("get", obj);

    if (obj == null) {
      return void 0;
    }

    /*console.debug("_byId", (this._byId[obj] ||
      this._byId[this.modelId(this._isModel(obj) ? obj._attributes : obj)] ||
      obj.cid && this._byId[obj.cid]));*/

    return this._byId[obj] ||
      this._byId[this.modelId(this._isModel(obj) ? obj._attributes : obj)] ||
      obj.cid && this._byId[obj.cid];
  };

  /** Returns `true` if the model is in the collection.
   */
  has(obj) {
    return (this.get(obj) !== null);
  };

  /** Get the model at the given index.
   */
  at(index) {
    if (index < 0) {
      index += this.length;
    }
    return this.models[index];
  };

  /** find the model that matches these properties
   * @param {object} attrs properties to match
   * @returns {Augmented.AbstractModel} model that matched
   */
  find(attrs) {
    const results = findModelByMatchingProperties(this.models, attrs);
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  };

  /** filter the models that match these properties
   * @param {object} attrs properties to match
   * @returns {array} models that matched
   */
  filter(attrs) {
    return findModelByMatchingProperties(this.models, attrs);
  };

  /** Return models with matching attributes. Useful for simple cases of `filter`.
    * @param {object} attrs properties to match
    * @returns {Model|array} models that matched
   */
  where(attrs, first) {
    if (first) {
      return this.find(attrs);
    }
    return this.filter(attrs);
  };

  /** Return the first model with matching attributes. Useful for simple cases
   * of `find`.
   */
  findWhere(attrs) {
    return this.where(attrs, true);
  };

  /** Force the collection to re-sort itself. You don"t need to call this under
   * normal circumstances, as the set will maintain sort order as each item
   * is added.
   */
  sort(options = {}) {
    let comparator = this.comparator;
    if (!comparator) throw new Error("Cannot sort a set without a comparator");
    options || (options = {});

    let length = comparator.length;
    if (isFunction(comparator)) comparator = comparator.bind(this);

    // Run sort based on type of `comparator`.
    if (length === 1 || isString(comparator)) {
      this.models = this.sortBy(comparator);
    } else {
      this.models.sort(comparator);
    }
    if (!options.silent) this.trigger("sort", this, options);
    return this;
  };

  /** Pluck an attribute from each model in the collection.
   */
  pluck(attr) {
    let i = 0;
    const out = [], l = this.models.length;
    for (i = 0; i < l; i++) {
      out[i] = this.models[i].toJSON()[attr];
    }
    return out;
    //return this.map(attr + "");
  };

  /**
   * Fetch the collection
   */
  fetch(options) {};

  /** Create a new instance of a model in this collection. Add the model to the
   * collection immediately, unless `wait: true` is passed, in which case we
   * wait for the server to agree.
   */
  create(model, options) {
    options = options ? clone(options) : {};
    let wait = options.wait;
    model = this._prepareModel(model, options);
    if (!model) return false;
    if (!wait) this.add(model, options);
    let collection = this;
    let success = options.success;
    options.success = (m, resp, callbackOpts) => {
      if (wait) collection.add(m, callbackOpts);
      if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
    };
    model.save(null, options);
    return model;
  };

  /** **parse** converts a response into a list of models to be added to the
   * collection. The default implementation is just to pass it through.
   */
  parse(resp, options) {
    return resp;
  };

  /** Create a new collection with an identical list of models as this one.
   */
  clone() {
    return new this.constructor(this.models, {
      model: this.model,
      comparator: this.comparator
    });
  };

  /** Define how to uniquely identify models in the collection.
   */
  modelId(attrs) {
    if (attrs && this.model && this.model.idAttribute) {
      return attrs[this.model.idAttribute || "id"];
    } else {
      return "id";
    }
  };

  /** Get an iterator of all models in this collection.
   */
  values() {
    return new CollectionIterator(this, ITERATOR_VALUES);
  };

  /** Get an iterator of all model IDs in this collection.
   */
  keys() {
    return new CollectionIterator(this, ITERATOR_KEYS);
  };

  /** Get an iterator of all [ID, model] tuples in this collection.
   */
  entries() {
    return new CollectionIterator(this, ITERATOR_KEYSVALUES);
  };

  /**
   * supportsValidation - Returns True if this collection supports validation
   * @returns {boolean} Returns True if this collection supports validation
   */
  supportsValidation() {
    const ret = (this.schema && this.schema !== null && this.schema !== {});
    return (ret) ? true : false;
  };

  /**
   * isValid - Returns True if this collection is valid
   * @returns {boolean} Returns True if this collection is valid
   */
  isValid() {
    return (this.validationMessages) ? this.validationMessages.valid : true;
  };

  /**
   * getValidationMessages - Returns the validation messages
   * @returns {array} Returns the message is an array of objects.
   */
  getValidationMessages() {
    return (this.validationMessages && this.validationMessages.messages) ? this.validationMessages.messages : [];
  };

  /**
   * Validates the collection
   * @returns {array} Returns array of message from validation
   */
  validate() {
    if (this.supportsValidation()) {
      // validate from Validator
      let messages = [];
      this.validationMessages.messages = messages;
      this.validationMessages.valid = true;
      const a = this.toJSON(), l = (a && Array.isArray(a)) ? a.length : 0;
      let i = 0;
      if (!this._validationFramework) {
        this._validationFramework = new ValidationFramework();
      }
      const v = this._validationFramework;

      //console.debug("AUGMENTED: Collection Validate: Beginning with " + l + " models.");
      for (i = 0; i < l; i++) {
        messages[i] = v.validate(a[i], this.schema);
        if (!messages[i].valid) {
          this.validationMessages.valid = false;
        }
      }

      //logger.debug("AUGMENTED: Collection Validate: Completed isValid " + this.validationMessages.valid);
    } else {
      this.validationMessages.valid = true;
    }
    return this.validationMessages;
  };

  /**
   * Collecion.sync
   */
  sync(method, model, options) {};

  /**
   * save - Saves the collection as a "create"
   */
  save(options = {}) {
    this.sync("create", this, options);
  };

  /**
   * update - Updates the collection as an "update"
   */
  update(options = {}) {
    this.sync("update", this, options);
  };

  /**
   * remove - Remove from the collection as a "delete"
   */
  remove(options = {}) {
    this.sync("delete", this, options);
  };

  /**
   * sortByKey - Sorts the collection by a property key
   * @param {object} key The key to sort by
   */
  sortByKey(key) {
    if (key) {
      const data = this.toJSON();
      if (data) {
        const sorted = sortObjects(data, key);
        this.reset(sorted);
      }
    }
  };

  /**
   * isEmpty - returns true is the collection is empty
   * @returns {boolean} returns true is the collection is empty
   */
  isEmpty() {
    return (this.length === 0);
  };
  /**
   * size - returns the size of the collection
   * @returns {number} returns the size of the collection
   */
  size() {
    return this.length;
  };

  /**
   * toString - returns the collection data as a string
   * @returns {string} returns the collection data as a string
   */
  toString() {
    let ret = {};
    try {
      ret = JSON.stringify(this.toJSON());
    } catch(e) {
      console.error(e);
    }
    return ret;
  };

  /** Private method to reset all internal state. Called when the collection
   * is first initialized or reset.
   * @private
   */
  _reset() {
    this.length = 0;
    this.models = [];
    this._byId  = {};
  };

  // Prepare a hash of attributes (or other model) to be added to this collection.
  _prepareModel(attrs, options) {
    if (this._isModel(attrs)) {
      if (!attrs.collection) attrs.collection = this;
      return attrs;
    }
    options = options ? clone(options) : {};
    options.collection = this;
    const model = new AbstractModel(attrs, options); // used to be this.model, may be a problem if a custom model is passed.
    if (!model.validationError) {
      return model;
    }
    this.trigger("invalid", this, model.validationError, options);
    return false;
  };

  // Internal method called by both remove and set.
  _removeModels(models, options) {
    // console.debug("_removeModels", models);
    const removed = [];
    let i = 0;
    const l = models.length;
    for (i = 0; i < l; i++) {
      let model = this.get(models[i]);
      if (!model) continue;
      let json = model;
      if (model.toJSON) {
        json = model.toJSON();
      }
      const index = whereIndex(this.toJSON(), json);
      // console.debug("model index", index);
      if (index === undefined || typeof index !== "number") {
        continue;
      }

      this.models.splice(index, 1);
      // console.debug("models", this.models);

      this.length--;

      // Remove references before triggering "remove" event to prevent an infinite loop.
      delete this._byId[model.cid];
      const id = this.modelId(model._attributes);
      if (id != null) delete this._byId[id];

      if (!options.silent) {
        options.index = index;
        model.trigger("remove", model, this, options);
      }

      removed.push(model);
      this._removeReference(model, options);
    }
    return removed;
  };

  // Method for checking whether an object should be considered a model for
  // the purposes of adding to the collection.
  _isModel(model) {
    if (!model) {
      return false;
    }
    return model instanceof AbstractModel;
  };

  // Internal method to create a model's ties to a collection.
  _addReference(model, options = {}) {
    this._byId[model.cid] = model;
    let id = this.modelId(model._attributes);
    if (id != null) this._byId[id] = model;
    model.on("all", this._onModelEvent, this);
  };

  // Internal method to sever a model's ties to a collection.
  _removeReference(model, options = {}) {
    delete this._byId[model.cid];
    let id = this.modelId(model._attributes);
    if (id != null) delete this._byId[id];
    if (this === model.collection) delete model.collection;
    model.off("all", this._onModelEvent, this);
  };

  // Internal method called every time a model in the set fires an event.
  // Sets need to update their indexes when models change ids. All other
  // events simply proxy through. "add" and "remove" events that originate
  // in other collections are ignored.
  _onModelEvent(event, model, collection, options) {
    if (model) {
      if ((event === "add" || event === "remove") && collection !== this) return;
      if (event === "destroy") this.removeModels(model, options);
      if (event === "change") {
        let prevId = this.modelId(model.previousAttributes());
        let id = this.modelId(model._attributes);
        if (prevId !== id) {
          if (prevId != null) delete this._byId[prevId];
          if (id != null) this._byId[id] = model;
        }
      }
    }
    this.trigger.apply(this, arguments);
  };
};

export default AbstractCollection;
