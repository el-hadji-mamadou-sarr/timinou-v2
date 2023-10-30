import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@prisma/client";


export default function DndCard(task: Task) {
 
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-tertiary">{task.task_name}</CardTitle>
        <CardDescription className="text-lg text-white ">
          {task.task_description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <div>
          <h3 className="mb-2.5 text-primary">Neglected</h3>
          <Progress className="bg-tertiary" value={task.neglected} />
        </div>
        <div>
          <h3 className="mb-2.5 text-primary">Progress</h3>
          <Progress value={task.progress} className="bg-lightGreen" />
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
