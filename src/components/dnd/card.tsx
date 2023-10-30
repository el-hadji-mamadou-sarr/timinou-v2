import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DndCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-tertiary">Design Figma</CardTitle>
        <CardDescription className="text-lg text-white ">
          faire un design page acceuil figma, et page listes et création
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <div>
          <h3 className="mb-2.5 text-primary">Neglected</h3>
          <Progress className="bg-tertiary" value={33} />
        </div>
        <div>
          <h3 className="mb-2.5 text-primary">Progress</h3>
          <Progress value={33} className="bg-lightGreen" />
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
