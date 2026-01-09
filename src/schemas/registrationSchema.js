import z from "zod"

const registrationSchema = z.object({
    firstName: z.string().nonempty('Fornavn skal udfyldes'),
    lastName: z.string().nonempty('Efternavn skal udfyldes'),

    userName: z.string().nonempty("Brugernavn skal udfyldes")
    .regex(/^[a-zæøåA-ZÆØÅ0-9_]+$/,"Brugernavn må kun indeholde bogstaver, tal og underscore"),

    email: z.string().email('Ugyldig emailadresse'),
    
    password: z.string()
        .min(8, 'Password skal være mindst 8 tegn')
        .regex(/[A-ZÆØÅ]/, "Skal indeholde mindst ét stort bogstav")
        .regex(/[a-zæøå]/, "Skal indeholde mindst ét lille bogstav")
        .regex(/[\d]/, "Skal indeholde mindst ét tal")
        .regex(/[\W]/, "Skal indeholde mindst ét specialtegn"),
    confirmPassword: z.string().nonempty('Gentag password'),
    
    birthDate: z.string().refine((value) => {
        const birthYear = new Date(value).getFullYear()
        const thisYear = new Date().getFullYear()
        return thisYear - birthYear >= 18
    }, "Du skal være mindst 18 år"),

    country: z.enum(["Danmark", "Sverige", "Norge"],
    "Vælg et land"),

        phone: z.string().optional()
       .refine((value) => !value || /^\d{8}$/.test(value),
        "Telefonnummer skal være 8 cifre"),
})
    .refine(
        schema => schema.password === schema.confirmPassword,
        { path: ["confirmPassword"], message: "Passwords matcher ikke", }
    )



export default registrationSchema
