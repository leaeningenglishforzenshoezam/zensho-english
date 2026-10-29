// Public compatibility metadata only. No user data, bindings or credentials.
export const RELEASE_ID='2026-10-29-quest-save-v1';
export function releaseStatus(env={}){
 return {ok:true,release:RELEASE_ID,capabilities:{questSave:1,adventureProfile:2,learningClasses:env.LEARNING_CLASSES_ENABLED==='true',authoritativeEconomy:false}};
}
