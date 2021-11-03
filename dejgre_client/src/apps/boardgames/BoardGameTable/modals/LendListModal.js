import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DraggableDialog from "../../../../generics/components/DragModal";
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { getLendInfo, putLendInfo } from "../../store/actions/lendInfo";
import MaterialTableTrans from "../../../../generics/components/MaterialTableTrans";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';


export default function LendListModal({ open, onClose, game }) {
  const { t } = useTranslation(["boardgames"]);
  const dispatch = useDispatch()

  const lendInfo = useSelector((state) => {
    return state.boardGames.lendInfo[game.id] ?? [];
  }, shallowEqual);

  const onDialogClose = () => {
    onClose();
  }

  const onReturnClick = (e, rowData) => {
    dispatch(putLendInfo(rowData.id));
  }

  useEffect(() => {
    if (!lendInfo?.length) {
      dispatch(getLendInfo(game.id));
    }
  }, [])

  return (
    <DraggableDialog 
      onClose={onDialogClose}
      open={open}
      title={t("lendInfo.title", {"game": game.name})}
    >
      <MaterialTableTrans
        columns={[
          {field: "lend_start", title: t("lendInfo.lendStart")},
          {field: "person", title: t("lendInfo.person")},
          {field: "note", title: t("lendInfo.note")}
        ]}
        data={lendInfo.filter((item) => !item.lend_end)}
        editable={{}}
        actions={[
          {
            icon: AssignmentReturnedIcon,
            onClick: onReturnClick
          },
        ]}
      />
    </DraggableDialog>
  );  
}