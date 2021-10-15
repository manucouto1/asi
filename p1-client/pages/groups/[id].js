import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import GroupDetails from "../../components/GroupDetails/GroupDetails";

export default function Groups(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Detalles" description="Detalles de un grupo"/>
            <div>
                <GroupDetails query={router.query} />
            </div>
        </BasicLayout>
    )
}