import {useState, useEffect} from 'react'

const useForm = (callback, validate, initValues = {}) => {
  //React hook for values state initialized to initValues or empty object
  const [values, setValues] = useState(initValues)
  //React hook for errors state
  const [errors, setErrors] = useState({})
  //React hook to check if form is being submitted or just first load
  const [isSubmitting, setIsSubmitting] = useState(false)
  //Reach hook to check if errors are empty on first load and form is submitting
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors, callback, isSubmitting])
  //handle relevant form submit
  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    setErrors(validate(values))
    setIsSubmitting(true)
  }
  //Controlled input handle change and set value
  const handleChange = e => {
    e.persist()
    let val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    setValues(v => ({
      ...v, [e.target.name]: val
    }))
  }
  
  return {
    handleChange,
    handleSubmit,
    errors,
    values
  }
}
export default useForm
