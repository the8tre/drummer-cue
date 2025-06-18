import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appRouter } from "./app/app.routes";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { importProvidersFrom } from "@angular/core";

const browserLang = (
  navigator.language ||
  navigator.languages[0] ||
  "en"
).split("-")[0];

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

bootstrapApplication(AppComponent, {
  providers: [
    appRouter,
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: "en",
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).then((appRef) => {
  // Access the TranslateService after bootstrap
  const injector = appRef.injector;
  const translate = injector.get(TranslateService);
  translate.setDefaultLang("en");
  translate.use(browserLang); // dynamically switch to browser language
});
