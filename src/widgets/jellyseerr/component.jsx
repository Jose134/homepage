import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: statsData, error: statsError } = useWidgetAPI(widget, "request/count");

  if (statsError) {
    return <Container error={t("widget.api_error")} />;
  }

  if (!statsData) {
    return (
      <Container>
        <Block label={t("jellyseerr.pending")} />
        <Block label={t("jellyseerr.approved")} />
        <Block label={t("jellyseerr.available")} />
      </Container>
    );
  }

  return (
    <Container>
      <Block label={t("jellyseerr.pending")} value={statsData.pending} />
      <Block label={t("jellyseerr.approved")} value={statsData.approved} />
      <Block label={t("jellyseerr.available")} value={statsData.available} />
    </Container>
  );
}