import { useState } from "react";

export const useForm = (initialObject = {}) => {
    const [form, setForm] = useState(
        initialObject
    );

    const serialzarForm = (form) => {
        const formdata = new FormData(form);
        console.log(formdata);
        const objetocompleto = {};
        for (let [name, value] of formdata) {
            objetocompleto[name] = value;
        }
        return objetocompleto;
    }
    const send = (e) => {
        e.preventDefault();

        let artilce = serialzarForm(e.target);

        setForm(artilce);
        console.log(e.target);

    };
    const resetForm = () => {
        setForm(initialObject = {}); // Restablece el formulario a su estado inicial
        
    };

    const toChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form, [name]: value
        })
    }

    return {
        form, toChange, send, resetForm
    }
}
