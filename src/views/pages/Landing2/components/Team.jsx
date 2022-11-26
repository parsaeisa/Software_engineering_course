import React, { Component } from "react";

export class Team extends Component {
  render() {
    return (
      <div className="team-div">
        <p className="team-title">Contact Our Team</p>
        <div>
          {" "}
          <img className="team-avatars" src="amirali.svg"></img>
          <img className="team-avatars" src="sajjad.svg"></img>
          <img className="team-avatars" src="sana.svg"></img>
          <img className="team-avatars" src="parsa.svg"></img>
          <img className="team-avatars" src="reza.svg"></img>
          <img className="team-avatars" src="hasti.svg"></img>
        </div>
        <div>
          <p className="team-names">Amirali</p>
          <p className="team-names">Sajjad</p>
          <p className="team-names">Sana</p>
          <p className="team-names">Parsa</p>
          <p className="team-names">Reza</p>
          <p className="team-names">Hasti</p>
        </div>
        <div>
          <p className="team-info">Backend developer</p>
          <p className="team-info">Backend developer</p>
          <p className="team-info">Frontend developer</p>
          <p className="team-info">Frontend developer</p>
          <p className="team-info">Backend developer</p>
          <p className="team-info">Frontend developer</p>
        </div>
        <div>
          <p className="team-email">For further information feel free to email us: sharpsbackend@gmail.com</p>
        </div>
        <div>
          <p className="team-rights">Copyright © 2021 Sharps | All rights reserved.</p>
        </div>
      </div>
    );
  }
}

export default Team;
