import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'menu', loadChildren: './modules/menu/menu.module#MenuModule' },
    {path: 'user-mgmt', loadChildren:'./user-mgmt/user-mgmt.module#UserMgmtModule'},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
    {path: 'catalogue', loadChildren:'./catalogue/catalogue.module#CatalogueModule'},
    {path: 'simple-search', loadChildren:'./simple-search/simple-search.module#SimpleSearchModule'},
    {path: 'explore-search', loadChildren:'./explorative-search/explorative-search.module#ExplorativeSearchModule'},
    {path: 'bpe', loadChildren: './bpe/bpe.module#BPEModule'},
    {path: 'data-channel', loadChildren: './data-channel/data-channel.module#DataChannelModule'},
    {path: 'product-details', loadChildren: './product-details/product-details.module#ProductDetailsModule'},
    {path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
