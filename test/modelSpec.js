describe("Given an Abstract Model", () => {
  it("is defined", () => {
    expect(Model.AbstractModel).to.not.be.undefined;
  });

  let model;
  beforeEach(() => {
    model = new Model.AbstractModel();
  });
  afterEach(() => {
    model = null;
  });

  it("can check if empty", () => {
    expect(model.isEmpty()).to.be.true;
  });

  it("can reset with data", async () => {
    await model.set({ "y": "y" });
    await model.reset({ "x": "x" });

    expect(await model.get("x")).to.equal("x");
    expect(await model.get("y")).to.be.undefined;
  });

  it("can set with data", async () => {
    await model.set({ "x": "x" });
    expect(await model.get("x")).to.equal("x");
  });

  describe("Given validation", async () => {
	  beforeEach(() => {
	    model = new Model.AbstractModel();
	  });
	  afterEach(() => {
	    model = null;
	  });

		it("with no Schema does not support Validation", async () => {
			expect(await model.supportsValidation()).to.be.false;
		});

		it("with an empty Schema does support Validation", async () => {
			model.schema = {};
			expect(await model.supportsValidation()).to.be.true;
		});
	});

  describe("Given updated data", async () => {
    beforeEach(() => {
	    model = new Model.AbstractModel();
	  });
	  afterEach(() => {
	    model = null;
	  });

    it("can set with data and fires a change event", async () => {
      await model.set({ "x": "x" });
      expect(await model.get("x")).to.equal("x");
    });
  });

  describe("Given a new model", async () => {
    it("can set with data on construction", async () => {
      const model = new Model.AbstractModel( { "data" : "xyz" });
      const data = await model.get("data");
      expect(data).to.equal("xyz");
    });

    it("does not leak data to another model", async () => {
      await model.set({ "data": "123", "x": "x", "y": 2 });
      const model2 = new Model.AbstractModel({ "data" : "xyz", "x": "y" });
      const data1 = await model.toJSON();
      const data2 = await model2.toJSON();
      expect(data1).to.deep.equal({ "data": "123", "x": "x", "y": 2 });
      expect(data2).to.deep.equal({ "data" : "xyz", "x": "y" });
      expect(data1).to.not.equal(data2);
      expect(model._attributes).to.not.equal(model2._attributes);
      expect(model._attributes).to.deep.equal(data1);
      expect(model2._attributes).to.deep.equal(data2);
    });

    it("does not leak data to another model on contruction", async () => {
      model = new Model.AbstractModel({ "data": "123", "x": "x", "y": 2 });
      const model2 = new Model.AbstractModel({ "data" : "xyz", "x": "y" });
      const data1 = await model.toJSON();
      const data2 = await model2.toJSON();
      expect(data1).to.deep.equal({ "data": "123", "x": "x", "y": 2 });
      expect(data2).to.deep.equal({ "data" : "xyz", "x": "y" });
      expect(data1).to.not.equal(data2);
      expect(model._attributes).to.not.equal(model2._attributes);
      expect(model._attributes).to.deep.equal(data1);
      expect(model2._attributes).to.deep.equal(data2);
    });
  });
});
