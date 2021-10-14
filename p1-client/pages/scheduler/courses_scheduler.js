import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import MyScheduler from "../../components/MyScheduler";

export default function CourseScheduler(){
    
    return (
        <BasicLayout className="scheduler">
            <Seo title="Courses Scheduler" description="Courses Scheduler"/>
            <div className="scheduler__block">
                <MyScheduler/>
            </div>
        </BasicLayout>
    )
}