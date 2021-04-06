import React from "react";

export const LinkCard = ({link}) => {
  return (
    <>
      <h2>Link</h2>
      <p>Original: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Shortened: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Clicks: <strong>{link.clicks}</strong></p>
      <p>Created At: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
    </>
  )
}