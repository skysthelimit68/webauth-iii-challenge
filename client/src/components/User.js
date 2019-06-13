import React from 'react';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
  

const User = props => {
    return(
        <div className="userCard">
            <Card>
                <CardBody>
                    <CardTitle>
                        Department: {props.user.department}
                    </CardTitle>
                    <CardSubtitle>
                        {props.user.username}
                        <p>User ID: {props.user.id}</p>
                    </CardSubtitle>
                    <CardText>
                       
                           {props.user.password}

                    </CardText>
                </CardBody>
            </Card>
        </div>

        
    )
}

export default User;