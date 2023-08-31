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
import Svelte from '~/assets/stacks/svelte.svg';
import Swift from '~/assets/stacks/swift.svg';
import TypeScript from '~/assets/stacks/typeScript.svg';
import Vue from '~/assets/stacks/vue.svg';
import XD from '~/assets/stacks/xd.svg';
import { SkillName } from '~/services/recruit';

export const Skills = {
  [SkillName.SPRING]: Spring,
  [SkillName.REACT]: React,
  [SkillName.IOS]: Ios,
  [SkillName.VUE]: Vue,
  [SkillName.JAVA]: Java,
  [SkillName.JAVASCRIPT]: JavaScript,
  [SkillName.TYPESCRIPT]: TypeScript,
  [SkillName.NODEJS]: NodeJs,
  [SkillName.NEXTJS]: Next,
  [SkillName.NUXTJS]: Next, // NOTE: NuxtJS 추가
  [SkillName.XD]: XD,
  [SkillName.SWIFT]: Swift,
  [SkillName.FIGMA]: Figma,
  [SkillName.SVELTE]: Svelte,
  [SkillName.ANDROID]: Android,
  [SkillName.FLUTTER]: Flutter,
  [SkillName.DJANGO]: Django,
  [SkillName.ETC]: Next, // NOTE: ETC 추가
};
