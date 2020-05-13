const data = [
  { "Name": "Bob", "ID": 123, "Email": "bob@augmentedjs.org" },
  { "Name": "Jonathan", "ID": 234, "Email": "jonathon@augmentedjs.org" },
  { "Name": "Corey", "ID": 345, "Email": "corey@augmentedjs.org" },
  { "Name": "Seema", "ID": 456, "Email": "seema@augmentedjs.org" },
  { "Name": "Karen", "ID": 567, "Email": "karen@augmentedjs.org" }
],
puppies = [
  {
    "X": "Poodle",
    "Y": 50,
    "style": "red"
  },
  {
    "X": "Yorkie",
    "Y": 15,
    "style": "purple"
  },
  {
    "X": "Dachshund",
    "Y": 20,
    "style": "blue"
  },
  {
    "X": "Labrador",
    "Y": 90,
    "style": "green"
  },
  {
    "X": "Chihuahua",
    "Y": 12,
    "style": "yellow"
  },
  {
    "X": "Corgi",
    "Y": 30,
    "style": "orange"
  }
],
schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "User",
  "description": "A list of users",
  "type": "object",
  "properties": {
      "Name" : {
          "description": "Name of the user",
          "type" : "string"
      },
      "ID" : {
          "description": "The unique identifier for a user",
          "type" : "integer"
      },
      "Email" : {
          "description": "The email of the user",
          "type" : "string"
      }
  },
  "required": ["ID", "Name"]
};

describe("Given an Augmented Collection", () => {
  let c;
  beforeEach(() => {
    c = new Model.AbstractCollection();
  });
  afterEach(() => {
    c = null;
  });
  it("has an augmented Collection", () => {
    expect(Model.AbstractCollection).to.not.be.undefined;
  });

  it("can check if empty", () => {
    expect(c.isEmpty()).to.be.true;
  });

  it("can populate data", async () => {
    await c.addModels(data);
    expect(await c.size()).to.equal(5);
    expect(await c.at(2).get("ID")).to.equal(345);
  });

  it("can add data", async () => {
    await c.addModels(puppies);
    expect(await c.size()).to.equal(6);
    expect(await c.at(2).get("X")).to.equal("Dachshund");
  });

  it("can add data on construction", async () => {
    const arr = [ { "a": "x" }, { "a": "y" }, { "a": "z" } ];
    let i = 0;
    const map = await arr.map( (x) => {
      x.id = i;
      i++;
      return x;
    });

    c = new Model.AbstractCollection(map);
    //c.add(arr);
    //console.log("size", c.length);
    const first = await c.at(0);
    //console.log(first);
    const data = await first.get("a");
    expect(data).to.equal("x");
  });

  it("can sort data by key", async () => {
    await c.addModels(data);
    await c.sortByKey("Name");
    const first = await c.at(1);
    expect(await first.get("Name")).to.equal("Corey");
  });
  it("can validate", async () => {
    c.schema = schema;
    await c.addModels(data);
    await c.validate();
    //console.debug(c.validationMessages);
    expect(await c.isValid()).to.be.true;
  });
  it("validation returns messages on invalid data", async () => {
    c.schema = schema;
    await c.addModels({ bubba: "junk" });
    await c.validate();
    //console.debug(c.validationMessages);
    expect(await c.isValid()).to.be.false;
  });

  it("with no Schema does not support Validation", () => {
    expect(c.supportsValidation()).to.be.false;
  });

  it("with an empty Schema does support Validation", () => {
    c.schema = {};
    expect(c.supportsValidation()).to.be.true;
  });

  it("can find a model by matching properties", async () => {
    await c.addModels(data);
    const result = await c.find({ "Name": "Karen" });
    expect(await result.get("Name")).to.equal("Karen");
  });

  it("can filter a model by matching properties", async () => {
    await c.addModels(data);
    const result = await c.filter({ "ID": 123 });
    expect(await result[0].get("Name")).to.equal("Bob");
  });

  it("can remove a model from a collection", async () => {
    await c.addModels(data);
    const model = await c.find({ "Name": "Bob" });
    const orgSize = await c.size();
    const result = await c.removeModels(model);
    const size = await c.size();

    expect(model).to.not.be.undefined;
    expect(await result.get("Name")).to.equal("Bob");
    expect(orgSize).to.not.equal(size);
    expect(size).to.not.equal(0);
  });
});
