import * as Yup from 'yup';

export const schemaArticle = Yup.object().shape({
    // trim pour enlever les espaces a gauche et a droite
    title: Yup.string().trim().required("Le titre est requis imbécile!"),
    description: Yup.string().trim().required("La description est requise bon à rien."),
    image: Yup.string()
})
