import dynamic from 'next/dynamic';

const Alert = dynamic(
  () => import('~/components/ModalContent').then((mod) => mod.Alert),
  {
    ssr: false,
  }
);

const BottomMenu = dynamic(
  () => import('~/components/ModalContent').then((mod) => mod.BottomMenu),
  {
    ssr: false,
  }
);

const ArticleCommentModalForm = dynamic(
  () =>
    import('~/components/ModalContent').then(
      (mod) => mod.ArticleCommentModalForm
    ),
  {
    ssr: false,
  }
);

const Report = dynamic(
  () => import('~/components/ModalContent').then((mod) => mod.Report),
  {
    ssr: false,
  }
);

const RecruitParticipantDetail = dynamic(
  () =>
    import('~/components/ModalContent').then(
      (mod) => mod.RecruitParticipantDetail
    ),
  {
    ssr: false,
  }
);

export const modals = {
  alert: Alert,
  bottomMenu: BottomMenu,
  articleCommentForm: ArticleCommentModalForm,
  report: Report,
  recruitParticipantDetail: RecruitParticipantDetail,
} as const;
