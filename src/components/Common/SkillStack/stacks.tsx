import Android from '~/assets/stacks/android.svg';
import Django from '~/assets/stacks/django.svg';
import Figma from '~/assets/stacks/figma.svg';
import Flutter from '~/assets/stacks/flutter.svg';
import Ios from '~/assets/stacks/ios.svg';
import Java from '~/assets/stacks/java.svg';
import JavaScript from '~/assets/stacks/javaScript.svg';
import Next from '~/assets/stacks/next.svg';
import NodeJs from '~/assets/stacks/nodeJs.svg';
import React from '~/assets/stacks/react.svg';
import Spring from '~/assets/stacks/spring.svg';
import Svelt from '~/assets/stacks/svelt.svg';
import Swift from '~/assets/stacks/swift.svg';
import TypeScript from '~/assets/stacks/typeScript.svg';
import Vue from '~/assets/stacks/vue.svg';
import XD from '~/assets/stacks/xd.svg';

export const SkillStacks = {
  react: <React />,
  javaScript: <JavaScript />,
  typeScript: <TypeScript />,
  vue: <Vue />,
  svelt: <Svelt />,
  nextJs: <Next />,
  // ---- 프론트
  java: <Java />,
  node: <NodeJs />,
  spring: <Spring />,
  django: <Django />,
  // ---- 백엔드
  android: <Android />,
  ios: <Ios />,
  swift: <Swift />,
  flutter: <Flutter />,
  // ---- 모바일
  xd: <XD />,
  figma: <Figma />,
};

export type StacksType = keyof typeof SkillStacks;
