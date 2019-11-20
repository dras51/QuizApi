const addToParent = async function(docModel, docId, next) {
  const doc = await docModel.findById(this.docId);
  doc.questions.forEach(el => {
    if (el.question === this.question) {
      return new Error('This Question already exit');
    }
  });
  doc.questions.push(this._id);
  doc.save();
  next();
};

export default addToParent;
