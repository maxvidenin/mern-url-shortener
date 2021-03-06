import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {request} = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  })

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/links/generate',
          'POST',
          {from: link},
          {Authorization: `Bearer ${auth.token}`}
        )
        message(data.message)
        history.push(`/details/${data.link._id}`)
      } catch (e) {

      }
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Enter an url"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link ">Enter an url</label>
        </div>
      </div>
    </div>
  )
}


