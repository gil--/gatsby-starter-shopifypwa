export function parseErrors(errors) {
    let formInputErrors = {}
    errors.forEach(error => {
        if (error.field) {
            const fieldName = error.field[1] || error.field[0]
            formInputErrors[fieldName] = error.message
        } else if (error.message && !formInputErrors.formError) {
            formInputErrors.form = error.message
        }
    })

    return formInputErrors
}