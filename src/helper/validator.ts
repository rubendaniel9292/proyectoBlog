import validator from "validator";
//usando programacion funcional

export const validation = (params: any) => {
    let validarTitle =
        !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 5, max: undefined });
    let validarContent = !validator.isEmpty(params.content);
    if (!validarTitle || !validarContent) {
        throw new Error("No se ha validado la informacion");
    }
}

//usando POO
/*
class CustomValidator {
    constructor(private params: any) {}

    validateTitle() {
        return (
            !validator.isEmpty(this.params.title) &&
            validator.isLength(this.params.title, { min: 5, max: undefined })
        );
    }
    validateContent() {
        return !validator.isEmpty(this.params.content);
    }
    validate() {
        const validarTitle = this.validateTitle();
        const validarContent = this.validateContent();

        if (!validarTitle || !validarContent) {
            throw new Error("No se ha validado la informacion");
        }
    }
}

export const validation = (params: any) => {
    const customValidator = new CustomValidator(params);
    customValidator.validate();
};
 */