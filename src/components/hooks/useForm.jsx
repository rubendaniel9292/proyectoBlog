import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
    const [formulario, setFormulario] = useState(
  
        objetoInicial
    );
   

    const serialzarformulario = (formulario) => {
        const formdata = new FormData(formulario);
        console.log(formdata);
        const objetocompleto = {};
        for (let [name, value] of formdata) {
            objetocompleto[name] = value;
        }
        return objetocompleto;
    }
    const enviar = (e) => {
        e.preventDefault();
        /* se usa asi en caso de pocos inpust y con la ayuda de un useref y
          se remplaza por un for en serialzarformulario(), en caso de haber demaciado inputs 
    
        let curso = {
          titulo: tituloRef.current?.value || '',
          year: yearRef.current?.value || '',
          autor: autorRef.current?.value || '',
          descripcion: descripcionRef.current?.value || '',
          email: emailRef.current?.value || '',
        };*/

        let curso2 = serialzarformulario(e.target);
        //setFormuario(curso);se puede usar cualquiera de los sets depediendo del numero de forularios: pocos o muchos
        setFormulario(curso2);
        console.log(e.target);
        document.querySelector('.codigo')?.classList.add('enviado');
    };

    const cambiar = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario, [name]: value
        })
    }
    return {
        formulario, cambiar, enviar
    }
}
