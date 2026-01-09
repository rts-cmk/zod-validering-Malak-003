import registrationSchema from '../schemas/registrationSchema.js'
import '../RegistrationForm.sass'
import { useState } from 'react'
import  z  from "zod"


export default function RegistrationForm() {

    const [errors, setErrors] = useState({})

    const submitHandler = event => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)
        const formDataObject = Object.fromEntries(formData.entries())

        const result = registrationSchema.safeParse(formDataObject)

        if (result.success) {
            alert('Tak for din registrering')
        } else {
            const readableErrors = z.treeifyError(result.error)
            console.log(readableErrors.properties)

            setErrors(readableErrors.properties)
        }

    }

    return (
        <form onSubmit={submitHandler} className="registration-form" >

            <fieldset className="registration-form__fieldset">

                <legend className="registration-form__legend">Registration</legend>

                <label className="registration-form__label" >
                    <span className="registration-text">Fornavn </span>
                    <input type="text" name='firstName' />
                    <ul className='registration-form__error-list'>
                        {errors.firstName?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Efternavn </span>
                    <input type="text" name='lastName' />
                    <ul className='registration-form__error-list'>
                        {errors.lastName?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Brugernavn </span>
                    <input type="text" name='userName' />
                    <ul className='registration-form__error-list'>
                        {errors.userName?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Email </span>
                    <input type="email" name='email' />
                    <ul className='registration-form__error-list'>
                        {errors.email?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Password </span>
                    <input type="password" name='password' />
                    <ul className='registration-form__error-list'>
                        {errors.password?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Gentag password</span>
                    <input type="password" name='confirmPassword' />
                    <ul className='registration-form__error-list'>
                        {errors.confirmPassword?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label" >
                    <span className="registration-text">Fødselsdato </span>
                    <input type="date" name='birthDate' />
                    <ul className='registration-form__error-list'>
                        {errors.birthDate?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>

                </label>
                
                <label className="registration-form__label" >
                    <span className="registration-text">Land </span>
                    <select name="country">
                        <option value="">vælg land</option>
                        <option value="Danmark">Danmark</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Norge">Norge</option>
                    </select>
                    <ul className='registration-form__error-list'>
                        {errors.country?.errors.map(
                            (massage, index) => <li key={index}>{massage}</li>
                        )}
                    </ul>
                </label>

                <label className="registration-form__label">
                    <span>Telefon (valgfri)</span>
                    <input
                        type="tel"
                        name="phone"
                    />
                    <ul className="registration-form__error-list">
                        {errors.phone?.errors.map(
                            (message, index) => (<li key={index}>{message}</li>
                            ))}
                    </ul>
                </label>

            </fieldset>

            <button className="registration-form__button">Submit</button>

        </form>
    )

}
