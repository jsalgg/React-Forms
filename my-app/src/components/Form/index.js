import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

function Form({props}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [staff, setStaff] = useState('')
    //const [student, setStudent] = useState('')
    const [bio, setBio] = useState('')
    const [notifications, setNotifications] = useState(false)
    const [issuesArray, setIssuesArray] = useState([])
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newIssue = {
            id: nanoid(),
            name,
            email,
            phoneNumber,
            staff,
            bio,
            notifications
        }

        setIssuesArray((prevIssues)=>[...prevIssues,newIssue])
        resetValues()
    }

    const resetValues = () => {
        setName('')
        setEmail('')
        setPhoneNumber('')
        setStaff('')
        setBio('')
        setNotifications(false)
      }

      useEffect(()=>{
        const errors = [];

        if(!name) errors.push('Name must be present')
        if(!email.includes('@') || !email.includes('')) errors.push('Enter Valid Email')
        if(phoneNumber.length !== 10) errors.push('Enter Valid Phone Number')
        if(!bio.length > 280) errors.push('Bio too long')

        setValidationErrors(errors)

      },[name, email, phoneNumber, bio])

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='listErrors'>
                    {validationErrors && validationErrors.map(error=>
                    <p className='errors' key={error}>
                        *** {error}
                    </p>
                    )}
                </div>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={(event)=>setName(event.target.value)} value={name} id='name' type='text' />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input onChange={(event)=>setEmail(event.target.value)} value={email} type='email' />
                </div>
                <div>
                    <label htmlFor='phoneNumber'>Phone Number:</label>
                    <input onChange={(event)=>setPhoneNumber(event.target.value)} value={phoneNumber} type='number' />
                </div>
                <div>
                    <label htmlFor='staff'>Staff:</label>
                    <input onChange={(event)=>setStaff(event.target.value)} value='staff' type='radio' name='staffButton'/>
                    <label htmlFor='student'>Student:</label>
                    <input onChange={(event)=>setStaff(event.target.value)} value='student' type='radio' name='staffButton'/>
                </div>
                <div>
                    <label htmlFor='Bio'>Bio:</label>
                    <textarea onChange={(event)=>setBio(event.target.value)} value={bio} id='bio' />
                </div>
                <div>
                    <label htmlFor='emailNotifications'>Email Notifications?</label>
                    <input onClick={(event)=>setNotifications(!notifications)} value={notifications} type='checkbox' />
                    {/* <input onClick={(event)=>setNotifications(event.target.value)} value={!notifications} type='checkbox' /> */}
                </div>
                <div>
                    <button disabled={validationErrors.length} type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
  }

  export default Form;
