import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import DraggableDialog from "../../../../generics/components/DragModal";
import { useDispatch } from "react-redux";
import { postLendGame } from "../../store/actions/lendInfo";


export default function LendModal({ open, onClose, game }) {
  const { t } = useTranslation(["boardgames"])
  const dispatch = useDispatch();

  const onDialogClose = () => {
    onClose();
  }
  
  const onLendClick = () => {
    const data = {id: game.id};
    dispatch(postLendGame(data, onDialogClose));
  }

  return (
  <DraggableDialog 
    onClose={onDialogClose}
    open={open}
    title={t("lendModal.title")}
    actions={[
      <Button
        variant="contained"
        key="lend"
        onClick={onLendClick}
      >{t("lendModal.lend")}</Button>,
    ]}
  >
    {t("lendModal.description")}
  </DraggableDialog>
  );  
}