import { Component } from "vue";

export interface ComponentDefinition {
    component: Component | undefined;
    props?: Record<string, any>;
    vModel?: Record<string, any>;
  }