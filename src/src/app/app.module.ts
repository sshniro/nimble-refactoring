import { HomeComponent } from './shared/components/home/home.component';

import '../styles.css';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ng2-cookies';

import { AppCommonModule } from "./common/common.module";

// ToDo: Get rid of these dependencies or offer via AppCommonModule
import { BPEService } from './bpe/bpe.service';
import { BPService } from './bpe/bp.service';
import { BPDataService } from "./bpe/bp-view/bp-data-service";
import { CatalogueService } from "./catalogue/catalogue.service";
import { CategoryService } from "./catalogue/category/category.service";
import { PublishService } from "./catalogue/publish-and-aip.service";
import { ExplorativeSearchService } from './explorative-search/explorative-search.service';
import { SimpleSearchService } from './simple-search/simple-search.service';
import { SearchContextService } from './simple-search/search-context.service';
import { UserService } from './user-mgmt/user.service';
import { CredentialsService } from './user-mgmt/credentials.service';
import { DataChannelService } from "./data-channel/data-channel.service";
import { UnitService } from './common/unit-service';
import { PrecedingBPDataService } from "./bpe/bp-view/preceding-bp-data-service";
import { AnalyticsService } from './analytics/analytics.service';
import { EpcService } from './bpe/bp-view/epc-service';
import {DocumentService} from "./bpe/bp-view/document-service";
import {LogisticPublishingService} from './catalogue/publish/logistic-publishing.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AppCommonModule,
        NgbModule.forRoot()
    ],
    providers: [
        CookieService,
        BPEService,
        DataChannelService,
        BPService,
        BPDataService,
        CatalogueService,
        CategoryService,
        LogisticPublishingService,
        PublishService,
        ExplorativeSearchService,
        SimpleSearchService,
        SearchContextService,
        UserService,
        CredentialsService,
        UnitService,
        PrecedingBPDataService,
        AnalyticsService,
        EpcService,
        DocumentService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
