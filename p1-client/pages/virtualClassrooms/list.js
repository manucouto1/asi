import React, {useState} from "react";
import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import VirtualClassroomsList from "../../components/VirtualClassrooms/VirtualClassroomsList";
import VirtualClassroomCreationForm from "../../components/VirtualClassrooms/VirtualClassroomCreationForm";

export default function VirtualClassrooms(){
    const [role, setRole] = useState(sessionStorage.getItem("user_role"))
    console.log(sessionStorage.getItem("user_role"))
    const router = useRouter();

    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Lista de grupos del aula virtual"/>
            <div>
                {role && role.toLowerCase() === "profesor" && <VirtualClassroomCreationForm />}
                <VirtualClassroomsList/>
            </div>
        </BasicLayout>
    )
}