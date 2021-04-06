import React from "react";
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="center">There are no links yet...</p>
  }
  return (
    <table className="striped highlight responsive-table">
      <thead>
      <tr>
        <th>№</th>
        <th>Original</th>
        <th>Shortened</th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      {links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/details/${link._id}`}>Details</Link>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}