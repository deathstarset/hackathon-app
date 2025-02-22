import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Suggestion } from "./columns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TableActionsProps {
  suggestion: Suggestion;
}
export default function TableActions({ suggestion }: TableActionsProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [decisionDialogOpen, setDecisionDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(suggestion.id.toString())
            }
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRemoveDialogOpen(true)}>
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDecisionDialogOpen(true)}>
            Decision
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewSuggestionDialog
        suggestion={suggestion}
        setDialogOpen={setViewDialogOpen}
        dialogOpen={viewDialogOpen}
      />
      <DeleteSuggestionDialog
        suggestion={suggestion}
        setDialogOpen={setRemoveDialogOpen}
        dialogOpen={removeDialogOpen}
      />
      <DecisionDialog
        suggestion={suggestion}
        setDialogOpen={setDecisionDialogOpen}
        dialogOpen={decisionDialogOpen}
      />
    </>
  );
}

interface ViewSuggestionDialogProps {
  suggestion: Suggestion;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}
function ViewSuggestionDialog({
  suggestion,
  setDialogOpen,
  dialogOpen,
}: ViewSuggestionDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-8 p-8">
        <h3 className="text-2xl font-semibold">View Suggestion</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="field">Field</Label>
          <Input id="field" value={suggestion.field} className="col-span-3" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="activity">Activity</Label>
          <Input
            id="activity"
            value={suggestion.activity}
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={suggestion.description}
            className="col-span-3"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteSuggestionDialogProps {
  suggestion: Suggestion;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}
function DeleteSuggestionDialog({
  suggestion,
  setDialogOpen,
  dialogOpen,
}: DeleteSuggestionDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-8 p-8">
        <h3 className="text-2xl font-semibold">Remove Suggestion</h3>
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to remove suggestion?</p>
          <div className="flex items-center justify-between gap-2">
            <Button size={"lg"} className="w-full">
              Cancel
            </Button>
            <Button size={"lg"} variant={"destructive"} className="w-full">
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
interface DecisionDialogProps {
  suggestion: Suggestion;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}
function DecisionDialog({
  suggestion,
  setDialogOpen,
  dialogOpen,
}: DecisionDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-8 p-8">
        <h3 className="text-2xl font-semibold">Your Decision</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <Button size={"lg"} className="w-full" variant={"destructive"}>
              Reject
            </Button>
            <Button size={"lg"} className="w-full bg-green-700">
              Accept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
