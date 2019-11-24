/**
 *
 * describes the relationship a model can have
 * {
 *  type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    name: 'Users'
 * }
 */
export type options = {
  ref: string;
  type: any;
  name: string;
};
const hasOne = (schema: any, options: options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name]["type"] = options.type;
  schema.add(field);
};

const belongsTo = (schema: any, options: options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name]["type"] = options.type;
  schema.add(field);
};

const mustBelongTo = (schema: any, options: options) => {
  const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
  const field = JSON.parse(fieldInString);
  field[options.name]["type"] = options.type;
  field[options.name]["required"] = true;
  schema.add(field);
};

const hasMany = (schema: any, options: options) => {
  const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
  const field = JSON.parse(fieldInString);
  field[options.name][0]["type"] = options.type;
  field[options.name][0]["default"] = [];
  schema.add(field);
};

const belongsToMany = (schema: any, options: options) => {
  const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
  const field = JSON.parse(fieldInString);
  field[options.name][0]["type"] = options.type;
  field[options.name][0]["default"] = [];
  schema.add(field);
};