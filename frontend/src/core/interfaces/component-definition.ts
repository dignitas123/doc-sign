import { Component } from "vue";

export interface ComponentDefinition {
    component: Component | undefined;
    vModel?: Record<string, any> | undefined;
    props?: Record<string, any>;
  }