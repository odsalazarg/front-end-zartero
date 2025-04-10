import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card,TablaBusc } from '../Components';
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';
import { useSelector } from "react-redux"


function ListaUsuarios({setIdEditGestion,renderizarLista,setRenderizarLista,IdEditGestion}) {
    const alerta=new Alert()
    const userState=useSelector((store)=>store.user);
    const [Users, setUsers] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)

    const Permisos=()=>{
      console.log(userState)
      axios.post('http://localhost:3000/Api/Menu-Permisos', {
          IdUser:userState.id
      })
      .then(function (response) {
          console.log(response.data);
          console.log(response.data.data[0].tp_user)
          if(response.data.status===1){ 
              if(response.data.data[0].tp_user==1){
                queryEffect()
              }else{
                queryEffect2()
              }
          
          }else{        
          }
  
  
      })
      .catch(function (error) {
          console.log(error);
          
      })
  }
    
    const queryEffect=()=>{
      console.log('queryefect LIST')
      // setLoadingState(true)
        axios.post('http://localhost:3000/Api/Users', {
            IdUser:userState.id
          })
          .then(function (response) {
              if(response.data.status===1){

                console.log(response.data);
                setUsers(response.data.data)
                // setLoadingState(false)
              }
            
            
          })
          .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
          })
    }

    const queryEffect2=()=>{
      console.log('queryefect LIST')
      // setLoadingState(true)
        axios.get('http://localhost:3000/Api/UsersOperarios', {
            
          })
          .then(function (response) {
              if(response.data.status===1){
                console.log(response.data);
                setUsers(response.data.data)

              }
              // setLoadingState(false)
            
            
          })
          .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
          })
    }

    useEffect(() => {
      Permisos()
    }, [])

    useEffect(() => {
      // console.log("use efect re-render list")
      if(renderizarLista){
        // console.log("IF use efect re-render list")
        setUsers([])
        Permisos()
        setRenderizarLista(false)
      }
    }, [renderizarLista])
    

    
    
    

  return (
    <div style={{width:'100%',backgroundColor:''}}>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
          USUARIOS
        </div>
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Users.length>0?

            // <div>
            //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe, modi ipsa nesciunt quod dolore sed, amet recusandae distinctio explicabo et aliquam asperiores numquam, deserunt veniam aut odio eos dolores?
            //   Ad, beatae eius! Nesciunt magnam atque consequuntur sequi doloribus beatae porro totam repellendus laudantium possimus? A cupiditate velit ipsum quasi natus, numquam quisquam eius neque enim facilis fugiat modi iste.
            //   Quos nisi eius ipsum, aperiam culpa dolores recusandae eligendi ut corrupti voluptatem! A, aspernatur! Distinctio atque amet harum unde libero quam, dolorum possimus ex, ut ipsa adipisci officiis nemo recusandae.
            //   Optio voluptatem facilis necessitatibus beatae debitis ea nulla fuga enim, eos doloremque at pariatur! Inventore iusto quod et assumenda? Odit quam maxime reiciendis quos delectus a dolorem veniam maiores sed.
            //   Animi, incidunt numquam optio repellat repudiandae ducimus ratione ullam soluta omnis earum dolorum ab officiis. Possimus a earum veritatis. Ratione odio iste aliquid quisquam quam earum eum nihil dicta autem.
            //   Perferendis accusamus doloribus ipsum velit sapiente illum nostrum asperiores! In eligendi laborum aut facere, voluptas laudantium? Modi possimus deserunt dolore consequatur dolores quia, harum officia laudantium repudiandae, rerum a saepe!
            //   Sit facere ut aut quibusdam possimus, autem reiciendis voluptatum natus quae deserunt esse fugit dolores quaerat quod architecto voluptatibus id eligendi inventore vel et! Accusantium nostrum iusto laboriosam aliquid autem!
            //   Pariatur ut voluptas nostrum ratione quo cupiditate, quod culpa tempore consequuntur quasi id doloremque molestiae amet in? Itaque in quis repellat sapiente dolorum impedit tempora veniam, nesciunt voluptatum, accusantium odio?
            //   Harum, quis, perferendis odit excepturi aut enim architecto asperiores alias veritatis tempora non expedita sequi nostrum temporibus, delectus quia corrupti. Sunt perspiciatis culpa eum distinctio. Harum architecto tenetur impedit vero.
            //   Nostrum voluptatum fuga eligendi? Ullam, quidem molestiae. Inventore quam tempore rem necessitatibus non officia fugit ullam magni hic reiciendis sed voluptas, voluptatem esse a? Exercitationem repellendus reprehenderit dolores facilis architecto!
            // </div>


                <Card titulos={[
                    // { field: 'status', headerName: 'status' },
                    { field: 'username', headerName: 'Usuario' },
                    { field: 'nombre', headerName: 'Nombre' },
                    { field: 'apellido', headerName: 'Apellido' },
                    { field: 'cedula', headerName: 'Cedula' },
                    { field: 'telefono', headerName: 'Telefono' },
                    { field: 'password', headerName: 'Password' },
                ]}
                  data={Users}
                  setIdEditList={setIdEditGestion}
                  IdEditGestion={IdEditGestion}
                />

                // <TablaBusc titulos={[
                //     // { field: 'id', headerName: 'ID' },
                //     { field: 'username', headerName: 'Usuario' },
                //     { field: 'password', headerName: 'Password' },
                //     { field: 'nombre', headerName: 'Nombre' },
                //     { field: 'apellido', headerName: 'Apellido' },
                //     { field: 'cedula', headerName: 'Cedula' },
                //     { field: 'telefono', headerName: 'Telefono' },
                // ]}
                //     data={Users}
                // />
            :''
        }
        
    </div>
  )
}

export default ListaUsuarios