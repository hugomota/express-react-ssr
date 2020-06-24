import { useState, useEffect, useCallback } from 'react'

export interface IUseForm {
  disable: boolean
  handleBlur: Function
  handleChange: Function
  handleSubmit: Function
  values: { [key: string]: any }
  errors: { [key: string]: object }
}

const useForm = (
  initialValues: { [key: string]: any },
  validationSchema: { [key: string]: any },
  callback?: Function
) => {
  const [values, setValues] = useState<{ [key: string]: any }>(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: object }>({})
  const [disable, setDisable] = useState<boolean>(true)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [step, setStep] = useState(0)

  // Check if is a step validation and select the schema by steps
  if (Array.isArray(validationSchema)) validationSchema = validationSchema[step]

  // Disable button in initial render.
  useEffect(() => {
    setDisable(isFormValid())
  }, [])

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) setDisable(isFormValid())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, isDirty, step])

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  const isFormValid = useCallback(() => {
    const hasErrorInForm = Object.keys(validationSchema).some(key => {
      const error = errors[key] ? errors[key] : null
      const isInputFieldRequired = validationSchema[key].required

      return error || (isInputFieldRequired && !values[key])
    })

    return hasErrorInForm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, validationSchema])

  // Validation by field
  const validateField = useCallback(
    (event, trimValue = false) => {
      setIsDirty(true)
      const name = event.target ? event.target.name : event.name
      let value = event.target ? event.target.value : event.value

      if (trimValue) {
        value = value.trim()
      }

      let error = validationSchema[name].required && (!value || !value.length) ? 'This field is required' : ''

      if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === 'object') {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error
        }
      }

      setValues(prevState => ({ ...prevState, [name]: value }))
      setErrors(prevState => ({ ...prevState, [name]: error }))
    },
    [validationSchema]
  )

  const handleSubmit = useCallback(
    (event?: any) => {
      event && event.preventDefault()
      // Make sure that isFormValid returns false
      // Before calling the submit callback function
      if (!isFormValid()) {
        callback && callback(values, resetForm)
      }
    },
    [callback, values, isFormValid]
  )

  const handleChange = (e: any) => validateField(e)
  const handleBlur = (e: any) => validateField(e, true)

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setIsDirty(true)
    setStep(0)
  }

  return {
    values,
    errors,
    disable,
    handleChange,
    handleBlur,
    handleSubmit,
    step,
    setStep,
    resetForm,
  }
}

export default useForm
