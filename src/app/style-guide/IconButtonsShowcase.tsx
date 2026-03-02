"use client";

import { H4, TextSmall } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Settings01, SearchLg, X } from "@untitledui/icons";

export function IconButtonsShowcase() {
  return (
    <div>
      <H4 className="mb-4 text-text-primary">Icon buttons</H4>
      <div className="flex flex-wrap gap-4 items-center">
        <Button iconLeading={Settings01} aria-label="Settings" />
        <Button
          color="secondary"
          iconLeading={SearchLg}
          aria-label="Search"
        />
        <Button
          color="tertiary"
          iconLeading={X}
          aria-label="Close"
        />
        <ButtonUtility
          icon={Settings01}
          tooltip="Settings"
          color="secondary"
        />
        <ButtonUtility
          icon={SearchLg}
          tooltip="Search"
          color="tertiary"
        />
        <ButtonUtility
          icon={X}
          tooltip="Close"
          size="xs"
          color="secondary"
        />
        <ButtonUtility
          icon={Settings01}
          tooltip="Settings"
          size="xs"
          color="tertiary"
        />
      </div>
      <TextSmall className="mt-4 block text-text-tertiary">
        Left: Button (icon-only). Right: ButtonUtility (secondary, tertiary, xs,
        sm).
      </TextSmall>
    </div>
  );
}
