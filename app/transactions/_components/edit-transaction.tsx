"use client";

import { useState } from "react";

import { Transaction } from "@prisma/client";

import { PencilIcon } from "lucide-react";

import UpsertTransactionDialog from "@/app/_components/upsert-transaction";

import { Button } from "@/app/_components/ui/button";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export default function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
}
