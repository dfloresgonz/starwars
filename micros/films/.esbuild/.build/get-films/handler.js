var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// get-films/handler.ts
var handler_exports = {};
__export(handler_exports, {
  method: () => method
});
module.exports = __toCommonJS(handler_exports);

// ../../libs/Calculo.ts
var sumar = (a, b) => {
  return a + b;
};

// get-films/handler.ts
var response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  body: ""
};
var method = async (event, context) => {
  try {
    const suma = sumar(14, 28);
    const rpta = {
      suma
      // datos: resp
    };
    response.body = JSON.stringify(rpta);
  } catch (err) {
    console.log(err);
    response.statusCode = err.status || 500;
    response.body = JSON.stringify({
      msj: err.msj || "Hubo un error"
    });
  }
  return response;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  method
});
