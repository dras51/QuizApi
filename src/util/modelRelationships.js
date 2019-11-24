/**
 *
 * describes the relationship a model can have
 * {
 *  type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    name: 'Users'
 * }
 */
export const hasOne = (schema, options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name].type = options.type;
  schema.add(field);
};

export const belongsTo = (schema, options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name].type = options.type;
  schema.add(field);
};

export const mustBelongTo = (schema, options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name].type = options.type;
  field[options.name].required = true;
  schema.add(field);
};

export const hasMany = (schema, options) => {
  const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
  const field = JSON.parse(fieldInString);
  field[options.name][0].type = options.type;
  field[options.name][0].default = [];
  schema.add(field);
};

export const belongsToMany = (schema, options) => {
  const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
  const field = JSON.parse(fieldInString);
  field[options.name][0].type = options.type;
  field[options.name][0].default = [];
  schema.add(field);
};
