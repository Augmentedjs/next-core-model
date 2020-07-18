import { AugmentedObject } from "next-core-object";
import { extend, uniqueId } from "next-core-utilities";
import { ValidationFramework } from "next-core-validation";

// for now
// import { clone, has, result, defaults, isEqual, iteratee, defer, escape } from "lodash";

import clone from "lodash/clone";
import has from "lodash/has";
import result from "lodash/result";
import defaults from "lodash/defaults";
import isEqual from "lodash/isEqual";
import iteratee from "lodash/iteratee";
import defer from "lodash/defer";
import escape from "lodash/escape";

const _isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

const wrapError = (model, options) => {
  if (model) {
    const error = options.error;
    options.error = (resp) => {
      if (error) {
        error.call(options.context, model, resp, options);
      }
      model.trigger("error", model, resp, options);
    };
  }
};

/**
 * AbstractModel <br/>
 * Supports: <ul>
 * <li>Validation and Schemas</li>
 * <li>Security</li>
 * </ul>
 * @extends AugmentedObject
 */
class AbstractModel extends AugmentedObject {
  constructor(attributes, options = {}, ...args) {
    super(options);
    this.id = 0;
    this.idAttribute = "id"; // ????
    this.cidPrefix = "c";
    this.defaults = {};
    this.validationError = null;
    /**
     * uri root property
     * @property {string} uriRoot Root of the URI
     */
    this.uriRoot = "";
    this._pending = false;
    this._changing = false;
    this._previousAttributes = null;
    this._attributes = (attributes) ? attributes : {};

    // console.debug("next core model", this._attributes);
    /**
     * Schema property
     * @property {object} schema The JSON schema from this model
     */
    this.schema = null;

    /**
     * Validation Message property
     * @property {object} validationMessages The property holding validation message data
     */
    this.validationMessages = {
     valid: true
    };

    if (options && options.schema) {
      this.schema = options.schema;
    }

    this.preinitialize(args);
    this.cid = uniqueId(this.cidPrefix);
    if (options && options.collection) {
      this.collection = options.collection;
    }
    let attrs;
    if (options && options.parse) {
      attrs = this.parse(attrs, options) || {};
    }

    this.defaults = result(this, "defaults");
    attrs = defaults(extend({}, this.defaults, attrs), this.defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize(args);
  };

  get urlRoot() {
    return this.uriRoot;
  };

  set urlRoot(root) {
    return this.uriRoot = root;
  };

  preinitialize(...args) {
  };

  initialize(...args) {
  };

  /** Get the attribute form the Model
   * @returns {any} The model attribute
   */
  get(attribute) {
    return this._attributes[attribute];
  };

  /** Set a hash of model attributes on the object, firing `"change"`. This is
   * the core primitive operation of a model, updating the data and notifying
   * anyone who needs to know about the change in state.
   */
  set(key, value, options) {
    if (key === null) {
      return this;
    }
    // Handle both `"key", value` and `{key: value}` -style arguments.
    let attrs;
    if (typeof key === "object") {
      attrs = key;
      options = value;
      //console.debug("key is an object", attrs);
    } else {
      (attrs = {})[key] = value;
    }

    if (!options) {
      options = {};
    }

    //console.debug("model change attrs", attrs);

    // Run validation.
    if (!this._validate(attrs, options)) {
      console.warn("Model did not validate");
      return false;
    }

    // Extract attributes and options.
    const unset      = options.unset;
    const silent     = options.silent;
    const changes    = [];
    let changing   = this._changing;
    this._changing = true;

    if (!changing) {
      this._previousAttributes = clone(this._attributes);
      this.changed = {};
    }

    const current = this._attributes;
    const changed = this.changed;
    const prev  = this._previousAttributes;

    let attr;
    // For each `set` attribute, update or delete the current value.
    for (attr in attrs) {
      //console.debug("attr to set", attr);
      const val = attrs[attr];
      //console.debug("attr value set", attrs[attr]);
      //console.debug("current[attr], val", current[attr], val);
      if ( (typeof current[attr] === "string") && (typeof val === "string") && current[attr] !== val ) {
        changes.push(attr);
      } else if (!isEqual(current[attr], val)) {
        //console.debug("notequal current[attr], val", current[attr], val);
        changes.push(attr);
      }
      //console.debug("prev[attr], val", prev[attr], val);
      if ( (typeof prev[attr] === "string") && (typeof val === "string") && prev[attr] !== val ) {
        changed[attr] = val;
      } else if (!isEqual(prev[attr], val)) {
        //console.debug("assign changed[attr]", val);
        changed[attr] = val;
      } else {
        //console.debug("deleted changed[attr]");
        delete changed[attr];
      }
      if (unset) {
        //console.debug("unset deleted current[attr]");
        delete current[attr];
      } else{
        //console.debug("assign current[attr]", val);
        current[attr] = val;
      }
    }

    // Update the `id`.
    if (this.idAttribute in attrs) {
      this.id = this.get(this.idAttribute);
    }

    // Trigger all relevant attribute changes.
    if (!silent) {
      //console.debug("model set: not silent");
      //console.debug("model changes to act on", changes);
      if (changes.length) {
        this._pending = options;
      }
      let i = 0;
      for (i = 0; i < changes.length; i++) {
        this.trigger("change:" + changes[i], this, current[changes[i]], options);
      }
    }

    // You might be wondering why there's a `while` loop here. Changes can
    // be recursively nested within `"change"` events.
    if (changing) {
      return this;
    }
    if (!silent) {
      while (this._pending) {
        options = this._pending;
        this._pending = false;
        this.trigger("change", this, options);
      }
    }
    this._pending = false;
    this._changing = false;
    return this;
  };

  /** Escape the attribute data
   */
  escape(attribute) {
    return escape(this.get(attribute));
  };

  /** Has an attribute in the Model
   * @returns {bolean} Returns true if exists
   */
  has(attribute) {
    return this.get(attribute) !== null;
  };

  /** Special-cased proxy to underscore's `matches` method.
   */
  matches(attrs) {
    return !!iteratee(attrs, this)(this._attributes);
  };

  /** Remove an attribute from the model, firing `"change"`. `unset` is a noop
   * if the attribute doesn't exist.
   */
  unset(attr, options) {
    return this.set(attr, void 0, extend({}, options, {unset: true}));
  };

  /** Clear all attributes on the model, firing `"change"`.
   */
  clear(options) {
    let attrs = {};
    for (let key in this._attributes) attrs[key] = void 0;
    return this.set(attrs, extend({}, options, {unset: true}));
  };

  /**
   * Transforms model to pure toJSON
   */
  toJSON() {
    return clone(this._attributes);
  };

  //– sync x

  /** Fetch the model from the server, merging the response with the model's
   * local attributes. Any changed attributes will trigger a "change" event.
   */
  fetch(options = {}) {
    options = extend({parse: true}, options);
    let model = this;
    let success = options.success;
    options.success = (resp) => {
      let serverAttrs = options.parse ? model.parse(resp, options) : resp;
      if (!model.set(serverAttrs, options)) {
        return false;
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      model.trigger("sync", model, resp, options);
    };
    wrapError(this, options);
    return this.sync("read", this, options);
  };

  /** Set a hash of model attributes, and sync the model to the server.
   * If the server returns an attributes hash that differs, the model's
   * state will be `set` again.
   */
  save(key, val, options = {}) {
    // Handle both `"key", value` and `{key: value}` -style arguments.
    let attrs;
    if (key == null || typeof key === "object") {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options = extend({validate: true, parse: true}, options);
    let wait = options.wait;

    // If we're not waiting and attributes exist, save acts as
    // `set(attr).save(null, opts)` with validation. Otherwise, check if
    // the model will be valid when the attributes, if any, are set.
    if (attrs && !wait) {
      if (!this.set(attrs, options)) {
        return false;
      }
    } else if (!this._validate(attrs, options)) {
      return false;
    }

    // After a successful server-side save, the client is (optionally)
    // updated with the server-side state.
    let model = this;
    let success = options.success;
    let attributes = this._attributes;
    options.success = (resp) => {
      // Ensure attributes are restored during synchronous saves.
      model.attributes = attributes;
      let serverAttrs = options.parse ? model.parse(resp, options) : resp;
      if (wait) {
        serverAttrs = extend({}, attrs, serverAttrs);
      }
      if (serverAttrs && !model.set(serverAttrs, options)) {
        return false;
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      model.trigger("sync", model, resp, options);
    };
    wrapError(this, options);

    // Set temporary attributes if `{wait: true}` to properly find new ids.
    if (attrs && wait) {
      this._attributes = extend({}, attributes, attrs);
    }

    let method = this.isNew() ? "create" : (options.patch ? "patch" : "update");
    if (method === "patch" && !options.attrs) {
      options.attrs = attrs;
    }
    let request = this.sync(method, this, options);

    // Restore attributes.
    this._attributes = attributes;

    return request;
  };

  /** Destroy this model on the server if it was already persisted.
   * Optimistically removes the model from its collection, if it has one.
   * If `wait: true` is passed, waits for the server to respond before removal.
   */
  destroy(options = {}) {
    options = options ? clone(options) : {};
    let model = this;
    let success = options.success;
    let wait = options.wait;

    let destroy = () => {
      model.stopListening();
      model.trigger("destroy", model, model.collection, options);
    };

    options.success = (resp) => {
      if (wait) {
        destroy();
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      if (!model.isNew()) {
        model.trigger("sync", model, resp, options);
      }
    };

    let request = false;
    if (this.isNew()) {
      defer(options.success);
    } else {
      wrapError(this, options);
      request = this.sync("delete", this, options);
    }
    if (!wait) destroy();
    return request;
  };

  /** Default URL for the model's representation on the server -- use uri()
   * @deprecated use uri
   */
  url() {
    return this.uri();
  };

  /** Default URI for the model's representation on the server -- if you're
   * using restful methods, override this to change the endpoint
   * that will be called.
   */
  uri() {
    let base =
      result(this, "uriRoot") ||
      result(this.collection, "uri") ||
      uriError();
    if (this.isNew()) {
      return base;
    }
    let id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, "$&/") + encodeURIComponent(id);
  };

  /**
   * Keys of the attributes in this Model
   */
  keys() {
    return Object.keys(this._attributes);
  };

  /**
   * Values of the attributes in this Model
   */
  values() {
    return Object.values(this._attributes);
  };

  /* if needed these can be used from lodash or underscore against the model's attributes
  pairs() { // ??
  };

  invert() { // ??
  };

  pick() { // ??
  };

  omit() { // ??
  };

  chain() { // ??
  };
  */

  /** Converts a response into the hash of attributes to be `set` on
   * the model. The default implementation is just to pass the response along.
   */
  parse(resp, options) {
    return resp;
  };

  /** Create a new model with identical attributes to this one.
   */
  clone() {
    return new this.constructor(this._attributes);
  };

  /** A model is new if it has never been saved to the server, and lacks an id.
   */
  isNew() {
    return !this.has(this.idAttribute);
  };

  /** Determine if the model has changed since the last `"change"` event.
   * If you specify an attribute name, determine if that attribute has changed.
   */
  hasChanged(attr) {
   if (attr == null) {
     return !_isEmpty(this.changed);
   }
   return has(this.changed, attr);
  };

  /** Return an object containing all the attributes that have changed, or
   * false if there are no changed attributes. Useful for determining what
   * parts of a view need to be updated and/or what attributes need to be
   * persisted to the server. Unset attributes will be set to undefined.
   * You can also pass an attributes object to diff against the model,
   * determining if there *would be* a change.
   */
  changedAttributes(diff) {
    if (!diff) {
      return this.hasChanged() ? clone(this.changed) : false;
    }
    let old = this._changing ? this._previousAttributes : this._attributes;
    let changed = {};
    let hasChanged;
    for (let attr in diff) {
      let val = diff[attr];
      if (isEqual(old[attr], val)) {
        continue;
      }
      changed[attr] = val;
      hasChanged = true;
    }
    return hasChanged ? changed : false;
  };

  /** Get the previous value of an attribute, recorded at the time the last
   * `"change"` event was fired.
   */
  previous(attr) {
    if (attr == null || !this._previousAttributes) {
      return null;
    }
    return this._previousAttributes[attr];
  };

  /** Get all of the attributes of the model at the time of the previous
   * `"change"` event.
   */
  previousAttributes() {
    return clone(this._previousAttributes);
  };

  /**
   * supportsValidation - Returns True if this model supports validation
   * @returns {boolean} Returns True if this model supports validation
   */
  supportsValidation() {
    if (this.schema !== null) {
      return true;
    }
    return false;
  };

  /**
   * isValid - Returns True if this model is valid
   * Runs two level validation, attribute-level then JSON Schema
   * @returns {boolean} Returns True if this model is valid
   */
  isValid(options = {}) {
    const valid = this._validate({}, extend({}, options, {validate: true}));
    if (valid) {
      const messages = this.validate();
      return this.validationMessages.valid;
    }
    return valid;
  };
  /**
   * Validates the model
   * @returns {array} Returns array of messages from validation
   */
  validate() {
    if (!this._validationFramework) {
      this._validationFramework = new ValidationFramework();
    }
    const v = this._validationFramework;

    if (this.supportsValidation() && v.supportsValidation()) {
      // validate from Validator
      this.validationMessages = v.validate(this.toJSON(), this.schema);
    } else {
      this.validationMessages.valid = true;
    }
    return this.validationMessages;
  };
  /**
   * Gets the validation messages only in an array
   * @returns {array} Returns array of messages from validation
   */
  getValidationMessages() {
    const messages = [];
    if (this.validationMessages && this.validationMessages.errors) {
      const l = this.validationMessages.errors.length;
      var i = 0;
      for (i = 0; i < l; i++) {
        messages.push(this.validationMessages.errors[i].message + " from " + this.validationMessages.errors[i].dataPath);
      }
    }
    return messages;
  };
  /**
   * Sync model data (Should override as needed)
   */
  sync(method, model, options) {
  };
  /**
   * reset - clear and rewrite the model with passed data
   * @param {object} data The data to replace the model with (optional)
   */
  reset(data) {
    this.clear();
    if (data) {
      this.set(data);
    }
  };

  /**
   * isEmpty - returns true is the model is empty
   * @returns {boolean} returns true is the model is empty
   */
  isEmpty() {
    return ( (this._attributes) ? (Object.keys(this._attributes).length === 0) : true );
  };

  /**
   * toString - returns the model data as a string
   * @returns {string} returns the model data as a string
   */
  toString() {
    return JSON.stringify(this.toJSON());
  };

  /**
   * fetch - Fetches the model as a 'get'
   */
  fetch(options) {
    this.sync("read", this, options);
  };
  /**
   * save - Saves the model as a 'create'
   */
  save(options) {
    this.sync("create", this, options);
  };
  /**
   * update - Updates the model as a 'update'
   */
  update(options) {
    this.sync("update", this, options);
  };
  /**
   * destroy - Deletes the model as a 'delete'
   */
  destroy(options) {
    this.sync("delete", this, options);
  };

  /** Run validation against the next complete set of model attributes,
   * returning `true` if all is well. Otherwise, fire an `"invalid"` event.
   * @private
   */
  _validate(attrs, options) {
    if (options && (!options.validate || !this.validate)) {
      return true;
    }
    const messages = this.validate();
    //attrs = extend({}, this._attributes, attrs);
    //const error = this.validationError = this.validate(attrs, options);
    //console.log(`Validate error ${JSON.stringify(error)}`);
    //if (!error.valid) {
    //  return true;
    //}
    if (messages.valid) {
      return true;
    }
    this.trigger("invalid", this, messages, extend(options, {validationError: messages}));
    return false;
  };
};

export default AbstractModel;
