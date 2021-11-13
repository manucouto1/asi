import BasicLayout from "../../layouts/BasicLayout";
import SecretariaPanel from "../../components/secretaria/secretariaPanel";
import Seo from "../../components/Seo";
import ProfileSection from "../../components/profile/profileSection";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router'
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import {getRole} from "../../api/roles";


export default function Secretaria(){
    const {logout} = useAuth();
    const [user, setUser] = useState(undefined);
    const [role, setRole] = useState(false);
    

    useEffect(() => {
        (async () => {
            const result1 = await getMeApi(logout);
            const result2 = await getRole(result1.tipo_rol)
            setRole(result2.nombre);
            setUser(result1);
        })();
    },[]);

    return (
        <BasicLayout className="secretaria">
            <Seo title="Secretaría" description="Página de secretaría"/>
            {user !== undefined &&  <ProfileSection user={user}/>}
            {role === 'Secretario' && <SecretariaPanel/>}
            {role == 'Alumno' && <> </>}
        </BasicLayout>
    )
    
}