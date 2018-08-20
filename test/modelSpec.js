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

  it("can reset with data", () => {
    model.set({ "y": "y" });
    model.reset({ "x": "x" });

    expect(model.get("x")).to.equal("x");
    expect(model.get("y")).to.be.undefined;
  });

  it("can set with data", () => {
    model.set({ "x": "x" });
    expect(model.get("x")).to.equal("x");
  });

  describe("Given validation", () => {
	  beforeEach(() => {
	    model = new Model.AbstractModel();
	  });
	  afterEach(() => {
	    model = null;
	  });

		it("with no Schema does not support Validation", () => {
			expect(model.supportsValidation()).to.be.false;
		});

		it("with an empty Schema does support Validation", () => {
			model.schema = {};
			expect(model.supportsValidation()).to.be.true;
		});

		it("can generate a schema from a model", () => {
			model.set({ "Name": "Bob", "ID": 123, "Email": "bob@augmentedjs.org", "Role": "Architect", "Active": true });
      const v = new Model.ValidationFramework();
			const schema = v.generateSchema(model);
			expect(schema).to.not.be.undefined;
			expect(Model.isObject(schema)).to.be.true;
		});
	});
});
