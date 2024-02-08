import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { removeUser } from '@/lib/data'

const RemoveUserPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Usuń urzytkownika</CardTitle>
        <CardDescription>Usuń urzytkownika bazy danych</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={removeUser}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">username</Label>
              <Input
                id="name"
                placeholder="Nazwa użytkownika.."
                name="username"
                className="text-white"
              />
            </div>
          </div>
          <Button type="submit" className="border border-black">
            Usuń
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}

export default RemoveUserPage
