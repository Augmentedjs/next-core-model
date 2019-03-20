
const data = [
  { "Name": "Bob", "ID": 123, "Email": "bob@augmentedjs.org" },
  { "Name": "Jonathan", "ID": 234, "Email": "jonathon@augmentedjs.org" },
  { "Name": "Corey", "ID": 345, "Email": "corey@augmentedjs.org" },
  { "Name": "Seema", "ID": 456, "Email": "seema@augmentedjs.org" },
  { "Name": "Karen", "ID": 567, "Email": "karen@augmentedjs.org" }
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

  it("can populate data", () => {
    c.add(data);
    expect(c.size()).to.equal(5);
    expect(c.at(2).get("ID")).to.equal(345);
  });

  it("can add data", () => {
    const puppies = [
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
    ];

    c.add(puppies);
    expect(c.size()).to.equal(6);
    expect(c.at(2).get("X")).to.equal("Dachshund");
  });

  xit("can add data on construction", () => {
    const arr = [ { "a": "x" }, { "a": "y" }, { "a": "z" }];
    let i = 0;
    const map = arr.map( (x) => {
      x.id = i;
      i++;
      return x;
    });


    c = new Model.AbstractCollection(map);
    //c.add(arr);
    console.log("size", c.length);
    const first = c.at(1);
    console.log(first);
    expect(first.get("a")).to.equal("y");
  });

  it("can sort data by key", () => {
    c.add(data);
    c.sortByKey("Name");
    let first = c.at(1);
    expect(first.get("Name")).to.equal("Corey");
  });
  it("can validate", () => {
    c.schema = schema;
    c.add(data);
    c.validate();
    //console.debug(c.validationMessages);
    expect(c.isValid()).to.be.true;
  });
  it("validation returns messages on invalid data", () => {
    c.schema = schema;
    c.add({bubba: "junk"});
    c.validate();
    console.debug(c.validationMessages);
    expect(c.isValid()).to.be.false;
  });

  it("with no Schema does not support Validation", () => {
    expect(c.supportsValidation()).to.be.false;
  });

  it("with an empty Schema does support Validation", () => {
    c.schema = {};
    expect(c.supportsValidation()).to.be.true;
  });

  it("can find a model by matching properties", () => {
    c.add(data);
    const result = c.find({ "Name": "Karen" });
    expect(result.get("Name")).to.equal("Karen");
  });

  it("can filter a model by matching properties", () => {
    c.add(data);
    const result = c.filter({ "ID": 123 });
    expect(result[0].get("Name")).to.equal("Bob");
  });
});
